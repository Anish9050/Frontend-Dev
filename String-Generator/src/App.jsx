import React, { useCallback, useEffect, useMemo, useState } from "react";

export default function App() {
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({ lower: true, upper: true, digits: true, symbols: false });
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const strength = useMemo(() => {
    const sets = Object.values(options).filter(Boolean).length;
    const lenScore = Math.min(1, Math.max(0, (length - 8) / 14));
    const setScore = sets / 4;
    return Math.round((0.6 * lenScore + 0.4 * setScore) * 100);
  }, [length, options]);

  const charset = useMemo(() => {
    let s = "";
    if (options.lower) s += "abcdefghijklmnopqrstuvwxyz";
    if (options.upper) s += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.digits) s += "0123456789";
    if (options.symbols) s += "!@#$%^&*()-_=+[]{};:,.<>/?";
    return s;
  }, [options]);

  const generate = useCallback(() => {
    setCopied(false);
    setError("");
    if (!charset) {
      setError("Select at least one character set.");
      setValue("");
      return;
    }
    const arr = new Uint32Array(length);
    let out = "";
    if (window.crypto?.getRandomValues) {
      window.crypto.getRandomValues(arr);
      for (let i = 0; i < length; i++) out += charset[arr[i] % charset.length];
    } else {
      for (let i = 0; i < length; i++) out += charset[Math.floor(Math.random() * charset.length)];
    }
    setValue(out);
    setHistory((prev) => [out, ...prev.slice(0, 9)]);
  }, [charset, length]);

  const copy = useCallback(async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      console.error(e);
    }
  }, [value]);

  useEffect(() => { generate(); }, [generate]);

  const updateOption = (key) => (e) => setOptions((o) => ({ ...o, [key]: e.target.checked }));

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 text-slate-100">
      <div className="mx-auto w-full max-w-4xl">
        {/* header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            String Generator
          </h1>
          <p className="text-slate-300 mt-2">
            Create secure customizable strings in just one click.
          </p>
        </div>

        {/* main card */}
        <div className="rounded-2xl border border-slate-700 bg-blue-950/70 backdrop-blur shadow-lg p-5 md:p-6">
          {/* output row */}
          <div className="grid gap-3">
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <input
                type="text"
                value={value}
                readOnly
                placeholder="Your string will appear here..."
                onFocus={(e) => e.target.select()}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-700 bg-blue-900 text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
              />
              <div className="flex gap-2">
                <button
                  onClick={generate}
                  className="px-4 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 active:translate-y-px transition shadow"
                >
                  Generate
                </button>
                <button
                  onClick={copy}
                  disabled={!value}
                  className="px-4 py-3 rounded-xl font-semibold border border-slate-600 bg-blue-800 hover:bg-blue-700 disabled:opacity-60"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
            {error && <div className="text-red-400 font-semibold">{error}</div>}
          </div>

          {/* controls */}
          <div className="grid gap-6 mt-5">
            {/* length */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="length" className="font-semibold">Length</label>
                <span className="font-semibold">{length}</span>
              </div>
              <input
                id="length"
                type="range"
                min="4"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            {/* checkboxes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-700 bg-blue-900">
                <input type="checkbox" checked={options.lower} onChange={updateOption("lower")} className="accent-blue-500" />
                <span>Lowercase</span>
              </label>
              <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-700 bg-blue-900">
                <input type="checkbox" checked={options.upper} onChange={updateOption("upper")} className="accent-blue-500" />
                <span>Uppercase</span>
              </label>
              <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-700 bg-blue-900">
                <input type="checkbox" checked={options.digits} onChange={updateOption("digits")} className="accent-blue-500" />
                <span>Digits</span>
              </label>
              <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-700 bg-blue-900">
                <input type="checkbox" checked={options.symbols} onChange={updateOption("symbols")} className="accent-blue-500" />
                <span>Symbols</span>
              </label>
            </div>

            {/* strength bar */}
            <div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Strength</span>
                <strong>{strength}%</strong>
              </div>
              <div className="h-2 rounded-full bg-slate-700 overflow-hidden mt-1">
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-400"
                  style={{ width: `${strength}%` }}
                  aria-valuenow={strength}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>
        </div>

        {/* history */}
        {history.length > 0 && (
          <div className="mt-5 rounded-2xl border border-slate-700 bg-blue-950/70 backdrop-blur shadow-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Recent</h2>
              <button onClick={() => setHistory([])} className="text-blue-400 hover:underline">Clear</button>
            </div>
            <ul className="grid gap-2">
              {history.map((h, i) => (
                <li key={i} className="flex items-center justify-between gap-2 p-3 rounded-xl border border-slate-700 bg-blue-900">
                  <code className="text-sm text-slate-200 overflow-x-auto">{h}</code>
                  <button
                    className="px-3 py-1.5 rounded-lg border border-slate-600 bg-blue-800 hover:bg-blue-700"
                    onClick={() => navigator.clipboard.writeText(h)}
                  >
                    Copy
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <footer className="text-center text-slate-400 mt-6">
          Built by Anish Das (Front-end Intern) ©
        </footer>
      </div>
    </div>
  );
}
