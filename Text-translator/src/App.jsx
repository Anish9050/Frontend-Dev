// src/App.jsx
import { useEffect, useState } from 'react'
import { translate } from './lib/translate'
import { LANGUAGES } from './lib/languages'

export default function App() {
  const [input, setInput] = useState('')
  const [target, setTarget] = useState('hi')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 🔎 Quick sanity check for Option 1 (direct browser call)
  // Remove these logs after you confirm they print correct values.
  useEffect(() => {
    console.log('has key?', Boolean(import.meta.env.VITE_RAPIDAPI_KEY))
    console.log('host:', import.meta.env.VITE_RAPIDAPI_HOST)
    console.log('url:', import.meta.env.VITE_RAPIDAPI_URL)
  }, [])

  async function onTranslate(e) {
    e.preventDefault()
    setError('')
    setOutput('')
    setLoading(true)
    try {
      const res = await translate(input, target)
      setOutput(res)
    } catch (err) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  function copyOut() {
    if (!output) return
    navigator.clipboard.writeText(output).catch(() => {})
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      {/* Center card: dark modern look */}
      <div className="w-full max-w-2xl rounded-3xl shadow-2xl p-8 bg-slate-900/95 backdrop-blur text-slate-100 ring-1 ring-white/10">
        <h1 className="text-3xl font-bold mb-2 text-center">
          🌍 Text Translator
        </h1>
        <p className="text-slate-300 mb-6 text-center">
          Type in <span className="font-semibold text-slate-100">English</span> and translate it instantly.
        </p>

        <form onSubmit={onTranslate} className="grid gap-5">
          {/* Input */}
          <label>
            <span className="mb-2 block text-sm font-medium text-slate-200">English Text</span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              placeholder="Type here..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-800 p-4 text-slate-100 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </label>

          {/* Target + Button */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
            <label className="flex-1">
              <span className="mb-2 block text-sm font-medium text-slate-200">Target Language</span>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 p-3 text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select…</option>
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.name}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="shrink-0 rounded-2xl px-6 py-3 font-semibold text-white bg-indigo-500 hover:bg-indigo-600 transition disabled:opacity-60"
            >
              {loading ? 'Translating…' : 'Translate'}
            </button>
          </div>
        </form>

        {/* Error */}
        {error && (
          <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {/* Result */}
        {output && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Result</h2>
              <button
                onClick={copyOut}
                className="text-sm text-indigo-300 hover:underline"
              >
                Copy
              </button>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4 text-slate-100 shadow-inner whitespace-pre-wrap">
              {output}
            </div>
          </div>
        )}

        <footer className="mt-8 text-xs text-slate-400 text-center">
          ⚡ Powered by RapidAPI
        </footer>
      </div>
    </div>
  )
}
