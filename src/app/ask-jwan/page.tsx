'use client'

import { useState, useEffect } from 'react'
import { getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase'
import { ref, push, onValue } from 'firebase/database'

type Submission = {
  name: string
  email?: string
  message: string
  createdAt: number
}

export default function AskJwanPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [submissions, setSubmissions] = useState<Record<string, Submission>>({})

  useEffect(() => {
    if (!isFirebaseConfigured()) return
    const db = getFirebaseDb()
    if (!db) return
    const submissionsRef = ref(db, 'askJwan/submissions')
    const unsub = onValue(submissionsRef, (snapshot) => {
      const data = snapshot.val()
      setSubmissions(data || {})
    })
    return () => unsub()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    if (formData.get('website')) {
      setStatus('success')
      return
    }

    if (!isFirebaseConfigured()) {
      setStatus('error')
      return
    }

    const db = getFirebaseDb()
    if (!db) {
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const subsRef = ref(db, 'askJwan/submissions')
      await push(subsRef, {
        name: (formData.get('name') as string)?.trim() || 'Anonymous',
        email: (formData.get('email') as string)?.trim() || null,
        message: (formData.get('message') as string)?.trim() || '',
        createdAt: Date.now(),
      })
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const submissionList = Object.entries(submissions)
    .sort(([, a], [, b]) => (b?.createdAt || 0) - (a?.createdAt || 0))
    .slice(0, 20)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Ask Jwan</h1>
      <p className="text-gray-600 mb-6">
        Send Jwan a question or a nice message. A parent checks all messages before she sees them.
      </p>

      <div className="border border-gray-200 rounded-lg p-6 bg-white max-w-lg">
        <p className="text-sm text-gray-500 mb-4">
          (Parent note: Submissions are saved and shown below. Add Firebase config for cloud storage. Honeypot blocks spam.)
        </p>

        {status === 'success' && (
          <p className="text-green-600 mb-4 font-medium">Thanks! Your message was sent.</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 mb-4">Something went wrong. Please try again.</p>
        )}
        {!isFirebaseConfigured() && (
          <p className="text-amber-600 text-sm mb-4">
            Firebase not configured. Add NEXT_PUBLIC_FIREBASE_* env vars for saving submissions.
          </p>
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
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Leave blank</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <button
            type="submit"
            disabled={status === 'sending' || !isFirebaseConfigured()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>

      {isFirebaseConfigured() && submissionList.length > 0 && (
        <div className="mt-8 border border-gray-200 rounded-lg p-6 bg-white max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">Recent messages (parent view)</h2>
          <ul className="space-y-3">
            {submissionList.map(([id, sub]) => (
              sub && (
                <li key={id} className="border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-medium">{sub.name}</span>
                    <span className="text-xs text-gray-400">
                      {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                  {sub.email && (
                    <p className="text-sm text-gray-500">{sub.email}</p>
                  )}
                  <p className="mt-1 whitespace-pre-wrap">{sub.message}</p>
                </li>
              )
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
