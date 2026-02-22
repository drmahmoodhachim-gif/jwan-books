'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: "Jwan's Book Nook", icon: '🏠' },
  { href: '/reviews', label: 'My Book Reviews', icon: '📖' },
  { href: 'https://drmahmoodhachim-gif.github.io/jwan-library/', label: 'My Library', icon: '📚', external: true },
  { href: '/comics', label: 'Comics Corner', icon: '✏️' },
  { href: '/jwan-reading', label: 'Jwan Reading', icon: '📷' },
  { href: '/ask-jwan', label: 'Ask Jwan', icon: '✉️' },
  { href: '/about', label: 'About Me', icon: '👤' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="max-w-4xl mx-auto px-4 py-4 flex flex-wrap gap-4 border-b border-[var(--border)] bg-[var(--paper)]" aria-label="Main navigation">
      {navItems.map(({ href, label, icon, external }) => {
        const isCurrent = !external && (pathname === href || (href !== '/' && pathname.startsWith(href)))
        if (external) {
          return (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 py-2 px-3 rounded min-h-[44px] text-[var(--foreground-soft)] hover:text-[var(--accent)]"
              style={{ textDecoration: 'none' }}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </a>
          )
        }
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-1.5 py-2 px-3 rounded min-h-[44px] ${
              isCurrent
                ? 'font-semibold text-[var(--accent)]'
                : 'text-[var(--foreground-soft)] hover:text-[var(--accent)]'
            }`}
            style={{ textDecoration: 'none' }}
            aria-current={isCurrent ? 'page' : undefined}
          >
            <span aria-hidden="true">{icon}</span>
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
