'use client'

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'

const LIBRARY_URL = 'https://drmahmoodhachim-gif.github.io/jwan-library/'

type LibraryContextValue = {
  isOpen: boolean
  openLibrary: (book?: { title: string; author: string; notes?: string }) => void
  closeLibrary: () => void
}

const LibraryContext = createContext<LibraryContextValue | null>(null)

export function useLibrary() {
  const ctx = useContext(LibraryContext)
  if (!ctx) throw new Error('useLibrary must be used within LibraryProvider')
  return ctx
}

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [bookToAdd, setBookToAdd] = useState<{ title: string; author: string; notes?: string } | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const openLibrary = useCallback((book?: { title: string; author: string; notes?: string }) => {
    setBookToAdd(book || null)
    setIsOpen(true)
  }, [])

  const closeLibrary = useCallback(() => {
    setIsOpen(false)
    setBookToAdd(null)
  }, [])

  // When panel opens with a book to add, postMessage to iframe once it loads
  useEffect(() => {
    if (!isOpen || !bookToAdd || !iframeRef.current) return
    const iframe = iframeRef.current
    const handler = () => {
      iframe.contentWindow?.postMessage(
        { type: 'ADD_BOOK', book: bookToAdd },
        'https://drmahmoodhachim-gif.github.io'
      )
      setBookToAdd(null)
    }
    iframe.addEventListener('load', handler)
    const t = setTimeout(handler, 800)
    return () => { clearTimeout(t); iframe.removeEventListener('load', handler) }
  }, [isOpen, bookToAdd])

  return (
    <LibraryContext.Provider value={{ isOpen, openLibrary, closeLibrary }}>
      {children}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={closeLibrary}
            onKeyDown={(e) => e.key === 'Escape' && closeLibrary()}
            role="button"
            tabIndex={0}
            aria-label="Close library panel"
          />
          <div
            className="fixed top-0 right-0 h-full w-full max-w-xl bg-[var(--paper)] shadow-xl z-50 flex flex-col animate-slide-in"
            aria-modal="true"
            role="dialog"
            aria-label="My Library"
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)] shrink-0">
              <h2 className="text-xl font-semibold">My Library</h2>
              <button
                onClick={closeLibrary}
                className="p-2 rounded min-h-[44px] min-w-[44px] hover:bg-gray-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              <iframe
                ref={iframeRef}
                src={LIBRARY_URL}
                title="Jwan's Library"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="p-3 text-sm text-gray-500 border-t border-[var(--border)]">
              Your library is embedded here. Close the panel to keep browsing Jwan&apos;s Book Nook.
            </p>
          </div>
        </>
      )}
    </LibraryContext.Provider>
  )
}
