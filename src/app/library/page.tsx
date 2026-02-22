'use client'

import { useEffect } from 'react'

const LIBRARY_URL = 'https://drmahmoodhachim-gif.github.io/jwan-library/'

export default function LibraryPage() {
  useEffect(() => {
    window.location.href = LIBRARY_URL
  }, [])

  return (
    <div className="py-8 text-center">
      <p>Redirecting to My Library...</p>
      <a href={LIBRARY_URL} className="mt-4 inline-block underline">
        Click here if not redirected
      </a>
    </div>
  )
}
