'use client'

import { useState, useEffect } from 'react'
import { getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase'
import { ref, onValue } from 'firebase/database'

type LibraryBook = {
  id: string
  title: string
  author?: string
  url?: string
  notes?: string
  status?: string
  updatedAt?: number
}

export function LibraryBooksSection() {
  const [books, setBooks] = useState<Record<string, LibraryBook>>({})

  useEffect(() => {
    if (!isFirebaseConfigured()) return
    const db = getFirebaseDb()
    if (!db) return
    const booksRef = ref(db, 'jwanLibrary/books')
    const unsub = onValue(booksRef, (snapshot) => {
      const data = snapshot.val()
      setBooks(data || {})
    })
    return () => unsub()
  }, [])

  const bookList = Object.values(books).filter(Boolean).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))

  if (!isFirebaseConfigured() || bookList.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">In My Library</h2>
      <p className="text-gray-600 mb-6">Books in your library collection appear here. Add more in My Library.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {bookList.map((book) => (
          <div
            key={book.id}
            className="group border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition"
          >
            <div className="aspect-[2/3] bg-gray-100 flex items-center justify-center text-5xl">📖</div>
            <div className="p-3">
              <h3 className="font-semibold text-sm group-hover:text-blue-600 line-clamp-2">{book.title}</h3>
              <p className="text-xs text-gray-500">{book.author}</p>
              {book.status && (
                <span className="inline-block mt-1 text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                  {book.status.replace('-', ' ')}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
