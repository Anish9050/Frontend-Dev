export async function translate(text, targetLang) {
  if (!text?.trim()) throw new Error('Please enter text to translate.')
  if (!targetLang) throw new Error('Please choose a target language.')

  const res = await fetch('http://localhost:5174/api/translate', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ text, target: targetLang }),
  })

  const raw = await res.text()
  let json = {}
  try { json = JSON.parse(raw) } catch {}

  if (!res.ok) {
    const apiMsg = json?.error || json?.message || raw || `HTTP ${res.status} ${res.statusText}`
    throw new Error(`Translation failed: ${apiMsg}`)
  }

  const out = json?.data?.translatedText || json?.translatedText || json?.data || ''
  if (!out) throw new Error(`No translated text returned. Response: ${raw.slice(0, 200)}...`)
  return out
}
