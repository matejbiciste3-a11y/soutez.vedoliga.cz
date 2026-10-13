<?php
declare(strict_types=1);

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = array_values(array_filter(array_map('trim', explode(',', getenv('ALLOWED_ORIGINS') ?: 'https://soutez.vedoliga.cz,https://vedoliga.cz,https://www.vedoliga.cz'))));
$allowed = $origin === '' || in_array($origin, $allowedOrigins, true);

if ($allowed && $origin !== '') {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Headers: content-type');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(array $body, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function requestJson(string $url, string $method, ?array $body, array $headers): array
{
    $handle = curl_init($url);
    if ($handle === false) {
        throw new RuntimeException('Nelze vytvořit síťové spojení.');
    }
    curl_setopt_array($handle, [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_TIMEOUT => 20,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_POSTFIELDS => $body === null ? null : json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
    ]);
    $response = curl_exec($handle);
    $status = (int) curl_getinfo($handle, CURLINFO_HTTP_CODE);
    $error = curl_error($handle);
    curl_close($handle);
    if ($response === false || $error !== '') {
        throw new RuntimeException('Síťová služba neodpověděla.');
    }
    $decoded = json_decode($response, true);
    if (!is_array($decoded)) {
        throw new RuntimeException('Služba vrátila neplatnou odpověď.');
    }
    if ($status < 200 || $status >= 300) {
        throw new RuntimeException('Požadavek byl odmítnut.');
    }
    return $decoded;
}

if (!$allowed) {
    respond(['ok' => false, 'message' => 'Tato doména není povolená pro registraci.'], 403);
}
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    respond(['ok' => false, 'message' => 'Použijte registrační formulář.'], 405);
}

$raw = file_get_contents('php://input') ?: '';
if (strlen($raw) > 20000) {
    respond(['ok' => false, 'message' => 'Přihláška je příliš dlouhá.'], 413);
}
$body = json_decode($raw, true);
$requestId = is_array($body) ? ($body['request_id'] ?? '') : '';
$payload = is_array($body) ? ($body['payload'] ?? null) : null;

if (!is_string($requestId) || !preg_match('/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i', $requestId) || !is_array($payload) || !empty($body['honeypot'])) {
    respond(['ok' => false, 'message' => 'Neplatná přihláška.'], 400);
}

$supabaseUrl = rtrim(getenv('SUPABASE_URL') ?: 'https://lionmppvkrdwejifncay.supabase.co', '/');
$serviceKey = getenv('SUPABASE_SERVICE_ROLE_KEY') ?: '';
$resendKey = getenv('RESEND_API_KEY') ?: '';
$from = getenv('EMAIL_FROM') ?: '';
$replyTo = getenv('EMAIL_REPLY_TO') ?: 'info@vedoliga.cz';

if ($serviceKey === '') {
    respond(['ok' => false, 'message' => 'Registrace ještě není nastavená na hostingu.'], 503);
}

try {
    $registration = requestJson($supabaseUrl . '/rest/v1/rpc/register_film_school', 'POST', ['p_request_id' => $requestId, 'p_payload' => $payload], [
        'apikey: ' . $serviceKey,
        'Authorization: Bearer ' . $serviceKey,
        'Content-Type: application/json',
        'Prefer: return=representation',
    ]);
    if (($registration['ok'] ?? false) !== true) {
        respond($registration, 422);
    }
    $email = strtolower(trim((string) ($payload['email'] ?? '')));
    $school = trim((string) ($payload['school'] ?? 'Vědoliga'));
    $teams = is_array($payload['teams'] ?? null) ? count($payload['teams']) : 0;
    $players = 0;
    foreach (($payload['teams'] ?? []) as $team) {
        $players += (int) ($team['players'] ?? 0);
    }
    $emailState = 'pending';
    $message = 'Přihláška je uložená. Odesílání e-mailů ještě není nastavené.';
    if ($resendKey !== '' && $from !== '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $mail = requestJson('https://api.resend.com/emails', 'POST', [
            'from' => $from,
            'to' => [$email],
            'reply_to' => $replyTo,
            'subject' => 'Vědoliga – přihláška školy',
            'text' => "Dobrý den,\n\n přijali jsme přihlášku školy {$school} do filmové soutěže Vědoligy.\nRegistrační číslo: " . ($registration['registration_id'] ?? 'neuvedeno') . "\nPočet týmů: {$teams}\nPočet hráčů: {$players}\n\nTermín a podmínky účasti potvrdí organizátor.\n\nVědoliga – Učíme se. Soutěžíme. Rosteme.",
            'html' => '<div style="font-family:Arial,sans-serif;color:#111827;max-width:620px;margin:auto"><h2 style="color:#365cf5">VĚDOLIGA</h2><p>Dobrý den,</p><p>přijali jsme přihlášku školy <strong>' . htmlspecialchars($school, ENT_QUOTES, 'UTF-8') . '</strong> do filmové soutěže.</p><p>Registrační číslo: <strong>' . htmlspecialchars((string) ($registration['registration_id'] ?? 'neuvedeno'), ENT_QUOTES, 'UTF-8') . '</strong></p><p>' . $teams . ' týmů · ' . $players . ' hráčů</p><p>Termín a podmínky účasti potvrdí organizátor.</p><p>Vědoliga – Učíme se. Soutěžíme. Rosteme.</p></div>',
        ], [
            'Authorization: Bearer ' . $resendKey,
            'Content-Type: application/json',
        ]);
        if (!empty($mail['id'])) {
            $emailState = 'sent';
            $message = 'Přihláška je uložená. Potvrzení bylo předáno e-mailové službě.';
        }
    }
    respond([...$registration, 'ok' => true, 'email_state' => $emailState, 'message' => $message]);
} catch (Throwable $error) {
    respond(['ok' => false, 'message' => 'Registraci se nyní nepodařilo uložit. Zkuste to později nebo kontaktujte info@vedoliga.cz.'], 503);
}
