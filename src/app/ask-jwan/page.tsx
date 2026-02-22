'use client'

import { useState } from 'react'
import { Breadcrumbs } from '@/components/Breadcrumbs'

// Replace with your Formspree form ID: https://formspree.io
const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'

export default function AskJwanPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    // Honeypot: if filled, it's a bot - don't submit
    if (formData.get('website')) {
      setStatus('success') // Pretend success to fool bots
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
      <p className="text-gray-600 mb-6">
        Send Jwan a question or a nice message. A parent checks all messages before she sees them.
      </p>

      <div className="border border-gray-200 rounded-lg p-6 bg-white max-w-lg">
        <p className="text-sm text-gray-500 mb-4">
          (Parent note: Submissions go to your email. No public display. Honeypot blocks spam.)
        </p>

        {status === 'success' && (
          <p className="text-green-600 mb-4 font-medium">Thanks! Your message was sent.</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 mb-4">Something went wrong. Please try again.</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Your name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Your email (optional)</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">Your question or message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          {/* Honeypot - hidden from users, bots will fill it */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Leave blank</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  )
}
