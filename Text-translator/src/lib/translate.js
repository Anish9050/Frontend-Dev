export async function translate(text, targetLang) {
if (!text?.trim()) throw new Error('Please enter text to translate.');
if (!targetLang) throw new Error('Please choose a target language.');


const url = import.meta.env.VITE_RAPIDAPI_URL;
const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
const host = import.meta.env.VITE_RAPIDAPI_HOST;


if (!url || !apiKey || !host) {
throw new Error('RapidAPI environment variables are missing. Check .env.local');
}


const body = new URLSearchParams({
source_language: 'en',
target_language: targetLang,
text,
});


const res = await fetch(url, {
method: 'POST',
headers: {
'content-type': 'application/x-www-form-urlencoded',
'X-RapidAPI-Key': apiKey,
'X-RapidAPI-Host': host,
},
body,
});


if (!res.ok) {
const msg = `HTTP ${res.status} — ${res.statusText}`;
throw new Error(`Translation failed: ${msg}`);
}


const json = await res.json();
// Expected shape: { data: { translatedText: '...' } }
const out = json?.data?.translatedText || json?.translatedText || json?.data || '';
if (!out) throw new Error('No translated text returned by API.');
return out;
}