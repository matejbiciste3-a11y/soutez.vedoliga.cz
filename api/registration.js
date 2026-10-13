import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { FONT_BASE64 } from '../lib/font.js';
const env = (key) => process.env[key] || '';
const origins = (env('ALLOWED_ORIGINS') || 'https://soutez.vedoliga.cz,https://vedoliga.cz,https://www.vedoliga.cz,https://vedoliga-filmova-soutez.vercel.app').split(',').map(v => v.trim()).filter(Boolean);
const base = env('SUPABASE_URL') || 'https://lionmppvkrdwejifncay.supabase.co';
const anon = env('SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxpb25tcHB2a3Jkd2VqaWZuY2F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2OTk2MTMsImV4cCI6MjEwMTI3NTYxM30.1OMG_Ni_UIpm-hkvcI2KLD3uyQKr5KXNyVWXOdAV8zY';
const service = env('SUPABASE_SERVICE_ROLE_KEY');
const from = env('EMAIL_FROM');
const replyTo = env('EMAIL_REPLY_TO') || 'info@vedoliga.cz';
const resend = env('RESEND_API_KEY');
const fontBytes = Uint8Array.from(atob(FONT_BASE64), c => c.charCodeAt(0));
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const b64 = (bytes) => { let s = ''; for (let i = 0; i < bytes.length; i += 8192)
    s += String.fromCharCode(...bytes.subarray(i, i + 8192)); return btoa(s); };
async function database(path, method = 'GET', body) { const r = await fetch(base + '/rest/v1/' + path, { method, headers: { apikey: anon, Authorization: 'Bearer ' + service, 'Content-Type': 'application/json', Prefer: 'return=representation' }, body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(12000) }); const data = await r.json(); if (!r.ok)
    throw new Error('Database request failed'); return data; }
async function makePdf(title, sections, created) { const doc = await PDFDocument.create(); doc.registerFontkit(fontkit); const font = await doc.embedFont(fontBytes, { subset: true }); doc.setTitle(title); doc.setAuthor('Vědoliga'); doc.setCreationDate(new Date(created)); doc.setModificationDate(new Date(created)); let page, y = 0; const fresh = () => { page = doc.addPage([595.28, 841.89]); page.drawText('VĚDOLIGA', { x: 48, y: 785, size: 17, font, color: rgb(.29, .49, 1) }); page.drawText('FILMOVÁ SOUTĚŽ · PRO ŠKOLY', { x: 48, y: 765, size: 9, font, color: rgb(.39, .45, .55) }); page.drawLine({ start: { x: 48, y: 747 }, end: { x: 547, y: 747 }, color: rgb(.86, .9, .96), thickness: 1 }); y = 719; page.drawText('vedoliga.cz · info@vedoliga.cz', { x: 48, y: 35, size: 9, font, color: rgb(.39, .45, .55) }); }; const lines = (text, size) => { const output = []; for (const paragraph of text.split('\n')) {
    let line = '';
    for (const word of paragraph.split(/\s+/)) {
        const candidate = line ? line + ' ' + word : word;
        if (font.widthOfTextAtSize(candidate, size) <= 493) {
            line = candidate;
            continue;
        }
        if (line)
            output.push(line);
        line = '';
        for (const char of word) {
            if (font.widthOfTextAtSize(line + char, size) > 493) {
                output.push(line);
                line = '';
            }
            line += char;
        }
    }
    output.push(line);
} return output; }; const write = (text, size, color = rgb(.1, .14, .23)) => { for (const line of lines(text, size)) {
    if (y < 65)
        fresh();
    page.drawText(line, { x: 48, y, size, font, color });
    y -= size * 1.6;
} }; fresh(); write(title, 21); y -= 14; for (const section of sections) {
    if (section.heading) {
        if (y < 110)
            fresh();
        write(section.heading, 12, rgb(.29, .49, 1));
        y -= 4;
    }
    write(section.text, 10.5);
    y -= 15;
} return b64(await doc.save()); }
export async function handler(req) {
    const origin = req.headers.get('origin') || '';
    const allowed = origins.includes(origin) || origin === new URL(req.url).origin;
    const cors = { 'Access-Control-Allow-Origin': allowed ? origin : origins[0], 'Access-Control-Allow-Headers': 'content-type', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Vary': 'Origin' };
    const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });
    if (origin && !allowed)
        return json({ ok: false, message: 'Tato doména není povolená pro registraci.' }, 403);
    if (req.method === 'OPTIONS')
        return new Response(null, { status: 204, headers: cors });
    if (req.method !== 'POST')
        return json({ ok: false, message: 'Použijte registrační formulář.' }, 405);
    if (!(req.headers.get('content-type') || '').toLowerCase().startsWith('application/json'))
        return json({ ok: false, message: 'Požadavek musí obsahovat JSON.' }, 415);
    if (Number(req.headers.get('content-length') || 0) > 20000)
        return json({ ok: false, message: 'Přihláška je příliš dlouhá.' }, 413);
    let registration = null, requestId = '', claim = '', claimed = false;
    try {
        if (!base || !service)
            return json({ ok: false, message: 'Registrace ještě není nastavená. Organizátor musí doplnit připojení k databázi na hostingu.' }, 503);
        const raw = await req.text();
        if (raw.length > 20000)
            return json({ ok: false, message: 'Přihláška je příliš dlouhá.' }, 413);
        let body;
        try {
            body = JSON.parse(raw);
        }
        catch {
            return json({ ok: false, message: 'Neplatná data formuláře.' }, 400);
        }
        if (!body || typeof body !== 'object' || Array.isArray(body))
            return json({ ok: false, message: 'Neplatná data formuláře.' }, 400);
        requestId = body.request_id;
        if (typeof requestId !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(requestId) || !body.payload || body.honeypot)
            return json({ ok: false, message: 'Neplatná přihláška.' }, 400);
        const result = await database('rpc/register_film_school', 'POST', { p_request_id: requestId, p_payload: body.payload });
        if (!result.ok)
            return json(result, 422);
        registration = result;
        const response = (emailState, message) => json({ ...registration, ok: true, email_state: emailState, message });
        if (!resend || !from)
            return response('pending', 'Přihláška je uložená. Odesílání e-mailů ještě není nastavené.');
        claim = crypto.randomUUID();
        const lease = await database('rpc/claim_film_registration_email', 'POST', { p_request_id: requestId, p_claim: claim });
        if (lease.state === 'sent')
            return response('sent', 'Přihláška už je uložená a potvrzení bylo předáno e-mailové službě.');
        if (lease.state === 'processing')
            return response('processing', 'Přihláška je uložená. Potvrzení se právě zpracovává; stav můžete znovu ověřit.');
        if (lease.state !== 'claimed')
            return response('failed', 'Přihláška je uložená, ale další pokus o e-mail musí vyřešit organizátor.');
        claimed = true;
        const rows = await database('filmove_prihlasky?request_id=eq.' + requestId + '&select=*');
        const row = rows[0];
        if (!row)
            throw new Error('Registration unavailable');
        let email = row.email_payload;
        const teams = row.team_details.map((t, i) => (i + 1) + '. ' + t.name + ' · ' + t.category + ' · ' + (t.class || 'třída neuvedena') + ' · ' + t.players + ' hráčů').join('\n');
        if (!email) {
            const receipt = await makePdf('Potvrzení přijetí přihlášky', [
                { heading: 'Registrační číslo', text: row.registration_number },
                { heading: 'Škola', text: row.school + '\n' + row.school_city },
                { heading: 'Kontaktní učitel', text: row.contact_name + '\n' + row.contact_email + (row.contact_phone ? '\n' + row.contact_phone : '') },
                { heading: 'Přihlášené týmy', text: teams + '\nCelkem ' + row.team_count + ' týmů a ' + row.participant_count + ' hráčů.' },
                { heading: 'Domluva školního kola', text: 'Preferovaný termín: ' + (row.preferred_date || 'Dle domluvy') + '\nPoznámka: ' + (row.message || 'Bez poznámky') },
                { heading: 'Co toto potvrzení znamená', text: 'Přihláška byla přijata do evidence Vědoligy. Konkrétní termín, pravidla, věkové kategorie a případné startovné ještě potvrdí organizátor. Toto potvrzení není faktura a nezakládá platební povinnost.' }
            ], row.created_at);
            const guide = await makePdf('Pokyny pro učitele', [
                { heading: '1. Před soutěží', text: 'Seznamte týmy s pravidly konkrétního kola. Doporučená velikost týmu je 2 až 5 žáků. Určete hráče, který bude zadávat společné odpovědi. Jména žáků v registraci nepotřebujeme.' },
                { heading: '2. Technické zajištění', text: 'Připravte zařízení s aktuálním prohlížečem a připojením k internetu. Při společném tréninku nastavte všem týmům stejné téma, pořadí otázek a časový limit. Pro tým je vhodný počítač nebo tablet.' },
                { heading: '3. Férový průběh', text: 'Týmy se mohou radit mezi sebou uvnitř svého týmu. Během kola nevyhledávají odpovědi na internetu a nenahlížejí do výsledků ostatních. Oficiální soutěž se řídí pravidly, která potvrdí organizátor.' },
                { heading: '4. Tréninkové bodování', text: 'Tréninkové kolo má 10 otázek. Správná odpověď znamená 1 bod, chybná nebo chybějící 0 bodů. Při stejném skóre mají týmy remízu. Trénink není oficiální soutěžní pořadí.' },
                { heading: '5. Co bude následovat', text: 'Organizátor potvrdí termín a podobu školního kola. Pokud je potřeba něco změnit, napište na info@vedoliga.cz a uveďte své registrační číslo ' + row.registration_number + '.' },
                { heading: 'Přihlášené týmy vaší školy', text: teams }
            ], row.created_at);
            email = { from, to: [row.contact_email], reply_to: replyTo, subject: 'Vědoliga – přihláška a pokyny | ' + row.registration_number,
                text: 'Dobrý den,\n\npřijali jsme přihlášku školy ' + row.school + ' do filmové soutěže Vědoligy.\nRegistrační číslo: ' + row.registration_number + '\nPočet týmů: ' + row.team_count + '\n\nV příloze najdete potvrzení a pokyny pro učitele. Termín a podmínky účasti ještě potvrdí organizátor.\n\nKontakt: ' + replyTo + '\nVědoliga – Učíme se. Soutěžíme. Rosteme.',
                html: '<div style="font-family:Arial,sans-serif;color:#111827;max-width:620px;margin:auto"><h2 style="color:#4b7cff">VĚDOLIGA</h2><p>Dobrý den,</p><p>přijali jsme přihlášku školy <strong>' + esc(row.school) + '</strong> do filmové soutěže.</p><div style="background:#eef4ff;border-radius:14px;padding:20px"><strong>' + esc(row.registration_number) + '</strong><p>' + row.team_count + ' týmů · ' + row.participant_count + ' hráčů</p></div><p>V příloze najdete <strong>potvrzení přihlášky</strong> a <strong>pokyny pro učitele</strong>.</p><p>Konkrétní termín a podmínky účasti ještě potvrdí organizátor. Toto potvrzení nezakládá platební povinnost.</p><p>Dotazy můžete poslat odpovědí na tento e-mail.</p><hr style="border:0;border-top:1px solid #dfeaf7"><p>Učíme se. Soutěžíme. Rosteme.<br>vedoliga.cz</p></div>',
                attachments: [{ filename: 'Vedoliga-potvrzeni-prihlasky.pdf', content: receipt }, { filename: 'Vedoliga-pokyny-pro-ucitele.pdf', content: guide }] };
            const saved = await database('filmove_prihlasky?request_id=eq.' + requestId + '&email_claim=eq.' + claim, 'PATCH', { email_payload: email });
            if (!saved.length)
                throw new Error('Email lease expired');
        }
        const sent = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: 'Bearer ' + resend, 'Content-Type': 'application/json', 'Idempotency-Key': 'film-registration/' + requestId }, body: JSON.stringify(email), signal: AbortSignal.timeout(18000) });
        const resultEmail = await sent.json();
        if (!sent.ok || !resultEmail.id)
            throw new Error('Email service rejected request');
        const saved = await database('filmove_prihlasky?request_id=eq.' + requestId + '&email_claim=eq.' + claim, 'PATCH', { email_status: 'sent', email_sent_at: new Date().toISOString(), email_provider_id: resultEmail.id, email_claim: null, email_claim_until: null });
        if (!saved.length)
            throw new Error('Email state unavailable');
        return response('sent', 'Přihláška je uložená. Potvrzení a dvě PDF přílohy byly předány e-mailové službě.');
    }
    catch (error) {
        console.error('Film registration failed:', error instanceof Error ? error.message : 'Unknown error');
        if (claimed && requestId) {
            try {
                await database('filmove_prihlasky?request_id=eq.' + requestId + '&email_claim=eq.' + claim, 'PATCH', { email_status: 'failed', email_claim: null, email_claim_until: null });
            }
            catch { }
        }
        if (registration)
            return json({ ...registration, ok: true, email_state: 'failed', message: 'Přihláška je uložená, ale odeslání potvrzení se nepodařilo potvrdit. Můžete zkusit znovu ověřit stav.' });
        return json({ ok: false, message: 'Registraci se nyní nepodařilo uložit. Zkuste to později nebo kontaktujte info@vedoliga.cz.' }, 503);
    }
}
export default { fetch: handler };
