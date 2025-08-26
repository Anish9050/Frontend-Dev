import React, { useMemo, useState } from "react";

const LANGUAGES = [
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "ml", name: "Malayalam" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "pa", name: "Punjabi" },
  { code: "kn", name: "Kannada" },
  { code: "ur", name: "Urdu" },
  { code: "ne", name: "Nepali" },
  { code: "si", name: "Sinhala" },
  { code: "ar", name: "Arabic" },
  { code: "fa", name: "Persian" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "es", name: "Spanish" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "zh-TW", name: "Chinese (Traditional)" },
  { code: "th", name: "Thai" },
  { code: "tr", name: "Turkish" },
  { code: "vi", name: "Vietnamese" },
  { code: "it", name: "Italian" },
  { code: "nl", name: "Dutch" },
  { code: "pl", name: "Polish" },
  { code: "uk", name: "Ukrainian" },
  { code: "sv", name: "Swedish" },
  { code: "cs", name: "Czech" },
  { code: "el", name: "Greek" },
  { code: "id", name: "Indonesian" },
  { code: "ms", name: "Malay" },
  { code: "ro", name: "Romanian" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "fi", name: "Finnish" },
  { code: "no", name: "Norwegian" },
];


const API_KEY_PRESENT = Boolean(import.meta.env?.VITE_RAPIDAPI_KEY);

// Small manual test presets ("test cases" you can click)
const TEST_CASES = [
  { label: "Hi → Hindi", text: "Hello, how are you?", target: "hi" },
  { label: "Welcome → Bengali", text: "Welcome to the translator app.", target: "bn" },
  { label: "Greeting → French", text: "Good morning!", target: "fr" },
];

export default function TranslatorApp() {
  const [text, setText] = useState("");
  const [target, setTarget] = useState("hi"); // default Hindi
  const [translated, setTranslated] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const remaining = useMemo(() => 5000 - text.length, [text]);

  function getApiKey() {
    // Vite exposes envs on import.meta.env
    return import.meta.env?.VITE_RAPIDAPI_KEY;
  }

  async function handleTranslate(e) {
    e?.preventDefault();
    setIsLoading(true);
    setError(null);
    setTranslated("");

    const apiKey = getApiKey();
    if (!apiKey) {
      setIsLoading(false);
      setError("Missing RapidAPI key. Add VITE_RAPIDAPI_KEY to your .env file.");
      return;
    }

    try {
      const url = "https://text-translator2.p.rapidapi.com/translate";
      const body = new URLSearchParams({
        source_language: "en",
        target_language: target,
        text,
      });

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
        },
        body,
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`HTTP ${res.status}: ${txt}`);
      }

      const data = await res.json();
      const output = data?.data?.translatedText;
      if (!output) throw new Error("No translation returned.");
      setTranslated(output);
    } catch (err) {
      setError(err?.message || "Translation failed.");
    } finally {
      setIsLoading(false);
    }
  }

  function swap() {
    // Allow quick back-translation: move translated text back to input
    if (!translated) return;
    setText(translated);
    setTranslated("");
  }

  function loadTestCase(tc) {
    setText(tc.text);
    setTarget(tc.target);
    setTranslated("");
    setError(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Card */}
        <div className="rounded-2xl shadow-2xl bg-slate-900/60 border border-slate-800 backdrop-blur p-6 md:p-8">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Text Translator</h1>
            <div className="flex items-center gap-3 text-xs md:text-sm opacity-80">
              <span className={API_KEY_PRESENT ? "text-emerald-400" : "text-amber-400"}>
                API key: {API_KEY_PRESENT ? "Detected" : "Missing"}
              </span>
              <span>RapidAPI • React • Tailwind</span>
            </div>
          </header>

          {/* Quick test cases */}
          <div className="mb-4 flex flex-wrap gap-2">
            {TEST_CASES.map((tc) => (
              <button
                key={tc.label}
                type="button"
                onClick={() => loadTestCase(tc)}
                className="text-xs md:text-sm rounded-full px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700"
                data-testid={`testcase-${tc.label}`}
              >
                {tc.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleTranslate} className="grid md:grid-cols-2 gap-6">
            {/* Input */}
            <div>
              <label className="block text-sm font-medium mb-2">English Text</label>
              <textarea
                className="w-full h-44 md:h-56 resize-none rounded-xl border border-slate-800 bg-slate-950/70 p-4 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Type or paste English text here..."
                maxLength={5000}
                value={text}
                onChange={(e) => setText(e.target.value)}
                data-testid="input-text"
              />
              <div className="mt-2 flex items-center justify-between text-xs opacity-70">
                <span>Characters left: {remaining}</span>
                <button
                  type="button"
                  onClick={() => setText("")}
                  className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700"
                  data-testid="btn-clear"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Output & controls */}
            <div>
              <label className="block text-sm font-medium mb-2">Target Language</label>
              <div className="flex gap-2">
                <select
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-950/70 p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  data-testid="select-target"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>{l.name}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={!text.trim() || isLoading}
                  className="whitespace-nowrap rounded-xl px-4 md:px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="btn-translate"
                >
                  {isLoading ? "Translating..." : "Translate"}
                </button>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Result</label>
                <div className="min-h-[11rem] md:min-h-[14rem] rounded-xl border border-slate-800 bg-slate-950/40 p-4" data-testid="output-box">
                  {error && (
                    <div className="text-red-400 text-sm bg-red-950/20 border border-red-900 rounded-lg p-3 mb-3" data-testid="error-box">
                      {error}
                    </div>
                  )}
                  {translated ? (
                    <p className="leading-7 whitespace-pre-wrap" data-testid="translated-text">{translated}</p>
                  ) : (
                    <p className="opacity-60 text-sm">Your translated text will appear here.</p>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={swap}
                    disabled={!translated}
                    className="rounded-lg px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50"
                    data-testid="btn-use-result"
                  >
                    Use result as input
                  </button>
                  {translated && (
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(translated)}
                      className="rounded-lg px-3 py-2 bg-slate-800 hover:bg-slate-700"
                      data-testid="btn-copy"
                    >
                      Copy
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>

          <footer className="mt-8 text-xs opacity-60">
            <p>
              Tip: For production, move the RapidAPI call to a serverless function (e.g. /api/translate) to hide your API key.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
