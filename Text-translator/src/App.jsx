import { useState } from 'react'
import { translate } from './lib/translate'
import { LANGUAGES } from './lib/languages'

export default function App() {
  const [input, setInput] = useState('Hello! How are you today?')
  const [target, setTarget] = useState('hi')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onTranslate(e) {
    e?.preventDefault()
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
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">
          Text Translator
        </h1>
        <p className="text-slate-600 mb-6">
          Enter English text and pick your favourite language.
        </p>

        <form onSubmit={onTranslate} className="grid gap-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              English text
            </span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={5}
              placeholder="Type something in English..."
              className="w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </label>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
            <label className="flex-1">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Target language
              </span>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
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
              className="shrink-0 rounded-2xl px-5 py-3 font-medium text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? 'Translating…' : 'Translate'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {output && (
          <div className="mt-6 grid gap-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Result</h2>
              <button
                type="button"
                onClick={copyOut}
                className="text-sm underline hover:no-underline"
              >
                Copy
              </button>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-sm whitespace-pre-wrap">
              {output}
            </div>
          </div>
        )}

        <footer className="mt-10 text-xs text-slate-400">
          Powered by RapidAPI · For demo use only.
        </footer>
      </div>
    </div>
  )
}