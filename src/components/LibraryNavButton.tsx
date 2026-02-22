'use client'

import { useLibrary } from './LibraryPanel'

export function LibraryNavButton() {
  const { openLibrary } = useLibrary()
  return (
    <button
      type="button"
      onClick={() => openLibrary()}
      className="flex items-center gap-1.5 py-2 px-3 rounded min-h-[44px] text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      style={{ textDecoration: 'none' }}
    >
      <span aria-hidden="true">📚</span>
      My Library
    </button>
  )
}
