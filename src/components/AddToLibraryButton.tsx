'use client'

import { useLibrary } from './LibraryPanel'

type AddToLibraryButtonProps = {
  title: string
  author: string
  notes?: string
  className?: string
}

export function AddToLibraryButton({ title, author, notes, className }: AddToLibraryButtonProps) {
  const { openLibrary } = useLibrary()
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        openLibrary({ title, author, notes })
      }}
      className={className ?? 'text-xs text-blue-600 hover:underline mt-1'}
      aria-label={`Add ${title} to My Library`}
    >
      + Add to My Library
    </button>
  )
}
