import Link from 'next/link'
import { getAllReviews } from '@/lib/reviews'
import { assetPath } from '@/lib/assetPath'

export default function ReviewsPage() {
  const reviews = getAllReviews()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Book Reviews</h1>
      <p className="text-gray-600 mb-8">Click a book to read my full review.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {reviews.map((review) => (
          <Link
            key={review.slug}
            href={`/reviews/${review.slug}`}
            className="group block border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition"
          >
            <div className="aspect-[2/3] bg-gray-100 flex items-center justify-center text-5xl">
              {review.cover ? (
                <img src={review.cover} alt="" className="w-full h-full object-cover" />
              ) : (
                '📖'
              )}
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm group-hover:text-blue-600 line-clamp-2">{review.title}</h3>
              <p className="text-xs text-gray-500">{review.author}</p>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < review.rating ? 'text-amber-500 text-xs' : 'text-gray-300 text-xs'}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {reviews.length === 0 && (
        <p className="text-gray-500">No reviews yet. Coming soon!</p>
      )}
    </div>
  )
}
