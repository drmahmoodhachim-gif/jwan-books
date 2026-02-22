import Link from 'next/link'
import { getAllReviews } from '@/lib/reviews'

export default function ReviewsPage() {
  const reviews = getAllReviews()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Book Reviews</h1>
      <p className="mb-8" style={{ color: 'var(--foreground-soft)' }}>Click a book to read my full review.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {reviews.map((review) => (
          <Link
            key={review.slug}
            href={`/reviews/${review.slug}`}
            className="block border border-[var(--border)] rounded-lg overflow-hidden no-underline"
            style={{ backgroundColor: 'var(--paper)' }}
          >
            <div className="aspect-[2/3] flex items-center justify-center text-5xl" style={{ backgroundColor: 'var(--border)' }}>
              {review.cover ? (
                <img src={review.cover} alt="" className="w-full h-full object-cover" />
              ) : (
                '📖'
              )}
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm line-clamp-2">{review.title}</h3>
              <p className="text-xs mt-1" style={{ color: 'var(--foreground-soft)' }}>{review.author}</p>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < review.rating ? 'text-[var(--star)] text-xs' : 'text-[var(--border)] text-xs'}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {reviews.length === 0 && (
        <p style={{ color: 'var(--foreground-soft)' }}>No reviews yet. Coming soon!</p>
      )}
    </div>
  )
}
