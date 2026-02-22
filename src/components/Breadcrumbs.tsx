import Link from 'next/link'

export type Breadcrumb = { href?: string; label: string }

type BreadcrumbsProps = {
  items: Breadcrumb[]
}

/** Breadcrumb navigation: Home > Section > Page */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1" style={{ color: 'var(--foreground-soft)' }}>
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span className="font-medium" style={{ color: 'var(--foreground)' }}>{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
