begin;

create table if not exists public.filmove_prihlasky (
 id uuid primary key default gen_random_uuid(),
 registration_number text not null unique default ('FILM-' || to_char(timezone('UTC', now()), 'YYYY') || '-' || upper(replace(gen_random_uuid()::text, '-', ''))),
 request_id uuid not null unique,
 school text not null check (char_length(school) between 2 and 160),
 team_name text not null check (char_length(team_name) between 2 and 60),
 contact_name text not null check (char_length(contact_name) between 2 and 100),
 contact_email text not null check (char_length(contact_email) between 5 and 254),
 category text not null check (category in ('2. stupeň ZŠ', 'Střední škola', 'ZŠ i SŠ / více kategorií')),
 team_count integer not null check (team_count between 1 and 200),
 message text not null default '' check (char_length(message) <= 3000),
 consent boolean not null check (consent = true),
 consent_at timestamptz not null default now(),
 status text not null default 'pending' check (status in ('pending', 'contacted', 'confirmed', 'cancelled')),
 created_at timestamptz not null default now()
);

create index if not exists filmove_prihlasky_email_created_idx on public.filmove_prihlasky (contact_email, created_at desc);
create index if not exists filmove_prihlasky_status_created_idx on public.filmove_prihlasky (status, created_at desc);

alter table public.filmove_prihlasky enable row level security;
revoke all on table public.filmove_prihlasky from public, anon, authenticated;
grant all on table public.filmove_prihlasky to service_role;

create or replace function public.submit_film_registration(
 p_request_id uuid,
 p_school text,
 p_team_name text,
 p_contact_name text,
 p_contact_email text,
 p_category text,
 p_team_count integer,
 p_message text default '',
 p_consent boolean default false
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $function$
declare
 v_school text := btrim(coalesce(p_school, ''));
 v_team text := btrim(coalesce(p_team_name, ''));
 v_contact text := btrim(coalesce(p_contact_name, ''));
 v_email text := lower(btrim(coalesce(p_contact_email, '')));
 v_message text := btrim(coalesce(p_message, ''));
 v_existing public.filmove_prihlasky%rowtype;
 v_new public.filmove_prihlasky%rowtype;
begin
 if p_request_id is null then
  return jsonb_build_object('ok', false, 'message', 'Chybí identifikátor přihlášky. Obnovte stránku.');
 end if;
 if char_length(v_school) not between 2 and 160 or char_length(v_team) not between 2 and 60 or char_length(v_contact) not between 2 and 100 then
  return jsonb_build_object('ok', false, 'message', 'Zkontrolujte název školy, týmu a kontaktní osobu. Každá položka musí mít alespoň dva znaky.');
 end if;
 if char_length(v_email) not between 5 and 254 or v_email !~ '^[^[:space:]<>@]+@[^[:space:]<>@]+\.[^[:space:]<>@]+$' then
  return jsonb_build_object('ok', false, 'message', 'Zadejte platnou e-mailovou adresu.');
 end if;
 if v_school ~ '[[:cntrl:]]' or v_team ~ '[[:cntrl:]]' or v_contact ~ '[[:cntrl:]]' or v_email ~ '[[:cntrl:]]' then
  return jsonb_build_object('ok', false, 'message', 'Text obsahuje nepovolené řídicí znaky.');
 end if;
 if p_category is null or p_category not in ('2. stupeň ZŠ', 'Střední škola', 'ZŠ i SŠ / více kategorií') or p_team_count is null or p_team_count not between 1 and 200 or char_length(v_message) > 3000 then
  return jsonb_build_object('ok', false, 'message', 'Zkontrolujte kategorii, počet týmů a délku zprávy.');
 end if;
 if p_consent is distinct from true then
  return jsonb_build_object('ok', false, 'message', 'Pro přihlášení je nutný souhlas se zpracováním údajů.');
 end if;
 perform pg_advisory_xact_lock(hashtextextended(p_request_id::text, 717));
 select * into v_existing from public.filmove_prihlasky where request_id = p_request_id;
 if found then
  if v_existing.school = v_school and v_existing.team_name = v_team and v_existing.contact_name = v_contact and v_existing.contact_email = v_email and v_existing.category = p_category and v_existing.team_count = p_team_count and v_existing.message = v_message then
   return jsonb_build_object('ok', true, 'registration_id', v_existing.registration_number, 'date', v_existing.created_at, 'message', 'Přihláška už byla přijata. Opakovaným odesláním nevznikla další registrace.');
  end if;
  return jsonb_build_object('ok', false, 'message', 'Tento formulář už byl odeslán s jinými údaji. Obnovte stránku.');
 end if;
 perform pg_advisory_xact_lock(hashtextextended(v_email, 718));
 if (select count(*) from public.filmove_prihlasky where contact_email = v_email and created_at > now() - interval '1 hour') >= 5 then
  return jsonb_build_object('ok', false, 'message', 'Na tento e-mail už přišlo více přihlášek. Zkuste to za hodinu nebo napište na info@vedoliga.cz.');
 end if;
 insert into public.filmove_prihlasky(request_id, school, team_name, contact_name, contact_email, category, team_count, message, consent)
 values(p_request_id, v_school, v_team, v_contact, v_email, p_category, p_team_count, v_message, true)
 returning * into v_new;
 return jsonb_build_object('ok', true, 'registration_id', v_new.registration_number, 'date', v_new.created_at, 'message', 'Přihláška byla uložena. Termín a podmínky účasti ještě potvrdí organizátor.');
end;
$function$;

revoke all on function public.submit_film_registration(uuid, text, text, text, text, text, integer, text, boolean) from public, anon, authenticated;
grant execute on function public.submit_film_registration(uuid, text, text, text, text, text, integer, text, boolean) to anon, authenticated;


alter table public.filmove_prihlasky add column if not exists school_city text not null default '';
alter table public.filmove_prihlasky add column if not exists contact_phone text not null default '';
alter table public.filmove_prihlasky add column if not exists team_details jsonb not null default '[]'::jsonb;
alter table public.filmove_prihlasky add column if not exists participant_count integer not null default 0;
alter table public.filmove_prihlasky add column if not exists preferred_date text not null default '';
alter table public.filmove_prihlasky add column if not exists submitted_payload jsonb;
alter table public.filmove_prihlasky add column if not exists email_status text not null default 'pending';
alter table public.filmove_prihlasky add column if not exists email_payload jsonb;
alter table public.filmove_prihlasky add column if not exists email_claim uuid;
alter table public.filmove_prihlasky add column if not exists email_claim_until timestamptz;
alter table public.filmove_prihlasky add column if not exists email_attempts integer not null default 0;
alter table public.filmove_prihlasky add column if not exists email_sent_at timestamptz;
alter table public.filmove_prihlasky add column if not exists email_provider_id text;

revoke all on function public.submit_film_registration(uuid,text,text,text,text,text,integer,text,boolean) from public, anon, authenticated;
grant execute on function public.submit_film_registration(uuid,text,text,text,text,text,integer,text,boolean) to service_role;

create or replace function public.register_film_school(p_request_id uuid, p_payload jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $f$
declare
 v_existing public.filmove_prihlasky%rowtype;
 v_school text := btrim(coalesce(p_payload->>'school',''));
 v_city text := btrim(coalesce(p_payload->>'city',''));
 v_contact text := btrim(coalesce(p_payload->>'teacher',''));
 v_email text := lower(btrim(coalesce(p_payload->>'email','')));
 v_phone text := btrim(coalesce(p_payload->>'phone',''));
 v_date text := btrim(coalesce(p_payload->>'preferred_date',''));
 v_message text := btrim(coalesce(p_payload->>'message',''));
 v_teams jsonb := p_payload->'teams';
 v_team jsonb;
 v_total integer := 0;
 v_number text;
 v_category text;
begin
 if p_request_id is null or p_payload is null or jsonb_typeof(p_payload) <> 'object' or octet_length(p_payload::text)>16000 then return jsonb_build_object('ok',false,'message','Neplatná přihláška.'); end if;
 if char_length(v_school) not between 2 and 160 or char_length(v_city) not between 2 and 100 or char_length(v_contact) not between 2 and 100 then return jsonb_build_object('ok',false,'message','Zkontrolujte školu, město a jméno učitele.'); end if;
 if char_length(v_email)>254 or v_email !~ '^[^[:space:]<>@]+@[^[:space:]<>@]+\.[^[:space:]<>@]+$' or char_length(v_phone)>30 or char_length(v_date)>100 or char_length(v_message)>3000 then return jsonb_build_object('ok',false,'message','Zkontrolujte e-mail, telefon a délku poznámky.'); end if;
 if coalesce(p_payload->>'consent','false') <> 'true' then return jsonb_build_object('ok',false,'message','Je nutný souhlas se zpracováním přihlášky.'); end if;
 if v_teams is null or jsonb_typeof(v_teams)<>'array' then return jsonb_build_object('ok',false,'message','Doplňte soutěžní týmy.'); end if;
 if jsonb_array_length(v_teams) not between 1 and 20 then return jsonb_build_object('ok',false,'message','Přihláška může obsahovat 1 až 20 týmů.'); end if;
 for v_team in select value from jsonb_array_elements(v_teams) loop
  if jsonb_typeof(v_team)<>'object' or char_length(btrim(coalesce(v_team->>'name',''))) not between 2 and 60 or char_length(coalesce(v_team->>'class',''))>40 or coalesce(v_team->>'category','') not in ('2. stupeň ZŠ','Střední škola') or coalesce(v_team->>'players','') !~ '^[2-5]$' then return jsonb_build_object('ok',false,'message','Každý tým potřebuje název, kategorii a 2 až 5 hráčů.'); end if;
  v_total:=v_total+(v_team->>'players')::integer;
 end loop;
 perform pg_advisory_xact_lock(hashtextextended(p_request_id::text, 719));
 select * into v_existing from public.filmove_prihlasky where request_id=p_request_id;
 if found then
  if v_existing.submitted_payload is distinct from p_payload then return jsonb_build_object('ok',false,'message','Tento formulář byl už odeslán s jinými údaji. Začněte novou přihlášku.'); end if;
  return jsonb_build_object('ok',true,'registration_id',v_existing.registration_number,'date',v_existing.created_at);
 end if;
 perform pg_advisory_xact_lock(hashtextextended(v_email, 718));
 if (select count(*) from public.filmove_prihlasky where contact_email=v_email and created_at>now()-interval '1 hour')>=5 then return jsonb_build_object('ok',false,'message','Na tento e-mail už přišlo více přihlášek. Zkuste to později.'); end if;
 select case when count(distinct value->>'category')>1 then 'ZŠ i SŠ / více kategorií' else min(value->>'category') end into v_category from jsonb_array_elements(v_teams);
 insert into public.filmove_prihlasky(request_id,school,team_name,contact_name,contact_email,category,team_count,message,consent,school_city,contact_phone,team_details,participant_count,preferred_date,submitted_payload)
 values(p_request_id,v_school,v_teams->0->>'name',v_contact,v_email,v_category,jsonb_array_length(v_teams),v_message,true,v_city,v_phone,v_teams,v_total,v_date,p_payload)
 returning registration_number into v_number;
 return jsonb_build_object('ok',true,'registration_id',v_number,'date',now());
end;
$f$;

create or replace function public.claim_film_registration_email(p_request_id uuid,p_claim uuid)
returns jsonb language plpgsql security definer set search_path = '' as $f$
declare v_row public.filmove_prihlasky%rowtype;
begin
 select * into v_row from public.filmove_prihlasky where request_id=p_request_id for update;
 if not found then return jsonb_build_object('state','missing'); end if;
 if v_row.email_status='sent' then return jsonb_build_object('state','sent'); end if;
 if v_row.email_claim_until>now() then return jsonb_build_object('state','processing'); end if;
 if v_row.email_attempts>=5 then return jsonb_build_object('state','limit'); end if;
 update public.filmove_prihlasky set email_status='processing',email_claim=p_claim,email_claim_until=now()+interval '3 minutes',email_attempts=email_attempts+1 where id=v_row.id;
 return jsonb_build_object('state','claimed');
end;
$f$;

revoke all on function public.register_film_school(uuid,jsonb) from public,anon,authenticated;
revoke all on function public.claim_film_registration_email(uuid,uuid) from public,anon,authenticated;
grant execute on function public.register_film_school(uuid,jsonb) to service_role;
grant execute on function public.claim_film_registration_email(uuid,uuid) to service_role;
revoke all on table public.filmove_prihlasky from public,anon,authenticated;
grant all on table public.filmove_prihlasky to service_role;
notify pgrst, 'reload schema';
commit;
