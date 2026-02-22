import Link from 'next/link'
import { getAllReviews } from '@/lib/reviews'

export default function HomePage() {
  const reviews = getAllReviews()
  const featured = reviews[0]

  return (
    <div className="space-y-12">
      <section className="pb-8 border-b border-[var(--border)]">
        <h1 className="text-3xl font-bold mb-4">Welcome to Jwan&apos;s Book Nook</h1>
        <p className="text-lg max-w-2xl" style={{ color: 'var(--foreground-soft)' }}>
          Hi! I love reading and sharing what I think about books.
          I also draw comics sometimes. Enjoy exploring!
        </p>
      </section>

      {featured && (
        <section className="border-2 border-[var(--border)] rounded-lg p-6" style={{ backgroundColor: 'var(--paper)' }}>
          <h2 className="text-xl font-semibold mb-4">What I&apos;m reading now</h2>
          <div className="flex gap-6 flex-wrap">
            <div className="w-24 h-36 rounded flex items-center justify-center text-4xl shrink-0" style={{ backgroundColor: 'var(--border)' }}>
              {featured.cover ? (
                <img src={featured.cover} alt="" className="w-full h-full object-cover rounded" />
              ) : (
                '📖'
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{featured.title}</h3>
              <p style={{ color: 'var(--foreground-soft)' }}>{featured.author}</p>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < featured.rating ? 'text-[var(--star)]' : 'text-[var(--border)]'}>
                    ★
                  </span>
                ))}
              </div>
              <Link href={`/reviews/${featured.slug}`} className="mt-3 inline-block">
                Read my full review →
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="pb-8 border-b border-[var(--border)]">
        <h2 className="text-xl font-semibold mb-4">My Book Reviews</h2>
        <p className="mb-4" style={{ color: 'var(--foreground-soft)' }}>Click a book to read my full review.</p>
        <Link
          href="/reviews"
          className="inline-block px-5 py-3 rounded min-h-[44px] no-underline"
          style={{ backgroundColor: 'var(--accent)', color: 'white' }}
        >
          View all reviews
        </Link>
      </section>

      <section className="border border-[var(--border)] rounded-lg p-6" style={{ backgroundColor: 'var(--paper)' }}>
        <h2 className="text-xl font-semibold mb-2">Have a question?</h2>
        <p className="mb-4" style={{ color: 'var(--foreground-soft)' }}>
          Use the Ask Jwan form to send me a message. A parent checks messages first.
        </p>
        <Link
          href="/ask-jwan"
          className="inline-block px-5 py-3 rounded min-h-[44px] no-underline"
          style={{ backgroundColor: 'var(--accent)', color: 'white' }}
        >
          Ask Jwan
        </Link>
      </section>
    </div>
  )
}
