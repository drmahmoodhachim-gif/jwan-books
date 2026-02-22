'use client'

import { useState } from 'react'

const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'

export default function AskJwanPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    if (formData.get('website')) {
      setStatus('success')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Ask Jwan</h1>
      <p className="mb-6" style={{ color: 'var(--foreground-soft)' }}>
        Send Jwan a question or a nice message. A parent checks all messages before she sees them.
      </p>

      <div className="border border-[var(--border)] rounded-lg p-6 max-w-lg" style={{ backgroundColor: 'var(--paper)' }}>
        <p className="text-sm mb-4" style={{ color: 'var(--foreground-soft)' }}>
          (Parent note: Submissions go to your email. No public display. Honeypot blocks spam.)
        </p>

        {status === 'success' && (
          <p className="mb-4 font-medium" style={{ color: 'var(--accent)' }}>Thanks! Your message was sent.</p>
        )}
        {status === 'error' && (
          <p className="mb-4" style={{ color: '#c53030' }}>Something went wrong. Please try again.</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">Your name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 rounded min-h-[44px] border"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--paper)' }}
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">Your email (optional)</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-3 py-2 rounded min-h-[44px] border"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--paper)' }}
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-medium mb-1">Your question or message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full px-3 py-2 rounded border"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--paper)' }}
            />
          </div>
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Leave blank</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-5 py-3 rounded min-h-[44px] disabled:opacity-50 no-underline"
            style={{ backgroundColor: 'var(--accent)', color: 'white' }}
          >
            {status === 'sending' ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  )
}
