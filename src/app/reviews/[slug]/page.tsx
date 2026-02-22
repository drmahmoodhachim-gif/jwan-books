import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getReviewBySlug, getReviewSlugs } from '@/lib/reviews'

export async function generateStaticParams() {
  return getReviewSlugs().map((slug) => ({ slug }))
}

export default async function ReviewPage({ params }: { params: { slug: string } }) {
  const review = getReviewBySlug(params.slug)
  if (!review) notFound()

  return (
    <article className="max-w-2xl">
      <Link href="/reviews" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to reviews
      </Link>

      <div className="flex gap-6 mb-8 flex-wrap">
        <div className="w-32 h-48 bg-gray-100 rounded flex items-center justify-center text-5xl shrink-0">
          {review.cover ? (
            <img src={assetPath(review.cover)} alt="" className="w-full h-full object-cover rounded" />
          ) : (
            '📖'
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{review.title}</h1>
          <p className="text-gray-600">{review.author}</p>
          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < review.rating ? 'text-amber-500' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
          {review.tags.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">{review.tags.join(', ')}</p>
          )}
        </div>
      </div>

      <div className="prose prose-gray max-w-none">
        <div className="whitespace-pre-wrap">{review.content}</div>
      </div>
    </article>
  )
}
