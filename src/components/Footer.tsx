import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/comics', label: 'Comics' },
  { href: '/jwan-reading', label: 'Jwan Reading' },
  { href: '/ask-jwan', label: 'Ask Jwan' },
  { href: '/about', label: 'About' },
]

export function Footer() {
  return (
    <footer className="mt-16 pt-8 border-t border-[var(--border)]" style={{ color: 'var(--foreground-soft)' }}>
      <p className="text-sm mb-3">Quick links:</p>
      <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-4 gap-y-2">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} className="text-sm hover:underline">
            {label}
          </Link>
        ))}
      </nav>
    </footer>
  )
}
