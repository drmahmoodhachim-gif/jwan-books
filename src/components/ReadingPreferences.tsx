'use client'

import { useEffect, useState } from 'react'

/** Reading preferences for neurodiversity - text size and line spacing (W3C COGA: user control) */
export function ReadingPreferences() {
  const [textSize, setTextSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [lineSpacing, setLineSpacing] = useState<'normal' | 'more' | 'extra'>('normal')

  useEffect(() => {
    const stored = typeof window !== 'undefined' && localStorage.getItem('jwan-reading-prefs')
    if (stored) {
      try {
        const { textSize: ts, lineSpacing: ls } = JSON.parse(stored)
        if (ts) setTextSize(ts)
        if (ls) setLineSpacing(ls)
      } catch {
        /* ignore */
      }
    }
  }, [])

  useEffect(() => {
    const scale = textSize === 'small' ? 0.9 : textSize === 'large' ? 1.15 : 1
    const lineH = lineSpacing === 'normal' ? 1.6 : lineSpacing === 'more' ? 1.8 : 2
    document.documentElement.style.setProperty('--text-scale', String(scale))
    document.documentElement.style.setProperty('--line-height-base', String(lineH))
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwan-reading-prefs', JSON.stringify({ textSize, lineSpacing }))
    }
  }, [textSize, lineSpacing])

  return (
    <div className="flex flex-wrap items-center gap-4 py-2 px-4 bg-[var(--paper)] border-b border-[var(--border)] text-sm">
      <span className="font-medium text-[var(--foreground)]">Reading:</span>
      <div className="flex items-center gap-1">
        <span className="text-[var(--foreground-soft)]">Text size</span>
        {(['small', 'medium', 'large'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setTextSize(s)}
            className={`min-w-[2.5rem] py-1 px-2 rounded border text-sm ${
              textSize === s
                ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                : 'bg-transparent border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)]'
            }`}
            aria-pressed={textSize === s}
            aria-label={`Text size ${s}`}
          >
            A
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[var(--foreground-soft)]">Line spacing</span>
        <select
          value={lineSpacing}
          onChange={(e) => setLineSpacing(e.target.value as typeof lineSpacing)}
          className="border border-[var(--border)] bg-[var(--paper)] px-2 py-1 rounded text-[var(--foreground)]"
          aria-label="Line spacing"
        >
          <option value="normal">Normal</option>
          <option value="more">More</option>
          <option value="extra">Extra</option>
        </select>
      </div>
    </div>
  )
}
