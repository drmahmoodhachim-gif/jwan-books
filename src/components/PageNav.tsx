import Link from 'next/link'

type PageNavProps = {
  back?: { href: string; label: string }
  prev?: { href: string; label: string }
  next?: { href: string; label: string }
}

/** Back, Previous, and Next navigation for friendly page-to-page movement */
export function PageNav({ back, prev, next }: PageNavProps) {
  const hasNav = back || prev || next
  if (!hasNav) return null

  return (
    <nav
      aria-label="Page navigation"
      className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[var(--border)] my-6"
    >
      <div className="flex items-center gap-3">
        {back && (
          <Link
            href={back.href}
            className="inline-flex items-center gap-1 py-2 px-3 rounded min-h-[44px] no-underline"
            style={{ color: 'var(--accent)' }}
          >
            ← {back.label}
          </Link>
        )}
        {prev && (
          <Link
            href={prev.href}
            className="inline-flex items-center gap-1 py-2 px-3 rounded min-h-[44px] no-underline"
            style={{ color: 'var(--accent)' }}
          >
            ← {prev.label}
          </Link>
        )}
      </div>
      <div>
        {next && (
          <Link
            href={next.href}
            className="inline-flex items-center gap-1 py-2 px-3 rounded min-h-[44px] no-underline"
            style={{ color: 'var(--accent)' }}
          >
            {next.label} →
          </Link>
        )}
      </div>
    </nav>
  )
}
