import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getReviewBySlug, getReviewSlugs, getAllReviews } from '@/lib/reviews'
import { assetPath } from '@/lib/assetPath'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { PageNav } from '@/components/PageNav'

export async function generateStaticParams() {
  return getReviewSlugs().map((slug) => ({ slug }))
}

export default async function ReviewPage({ params }: { params: { slug: string } }) {
  const review = getReviewBySlug(params.slug)
  if (!review) notFound()

  const allReviews = getAllReviews()
  const idx = allReviews.findIndex((r) => r.slug === params.slug)
  const prevReview = idx > 0 ? allReviews[idx - 1] : null
  const nextReview = idx >= 0 && idx < allReviews.length - 1 ? allReviews[idx + 1] : null

  return (
    <article className="max-w-2xl">
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { href: '/reviews', label: 'My Book Reviews' }, { label: review.title }]} />

      <PageNav
        back={{ href: '/reviews', label: '← Back to reviews' }}
        prev={prevReview ? { href: `/reviews/${prevReview.slug}`, label: `← Previous: ${prevReview.title}` } : undefined}
        next={nextReview ? { href: `/reviews/${nextReview.slug}`, label: `Next: ${nextReview.title} →` } : undefined}
      />

      <div className="flex gap-6 mb-8 flex-wrap">
        <div className="w-32 h-48 rounded flex items-center justify-center text-5xl shrink-0" style={{ backgroundColor: 'var(--border)' }}>
          {review.cover ? (
            <img src={assetPath(review.cover)} alt="" className="w-full h-full object-cover rounded" />
          ) : (
            '📖'
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{review.title}</h1>
          <p style={{ color: 'var(--foreground-soft)' }}>{review.author}</p>
          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < review.rating ? 'text-[var(--star)]' : 'text-[var(--border)]'}>
                ★
              </span>
            ))}
          </div>
          {review.tags.length > 0 && (
            <p className="text-sm mt-2" style={{ color: 'var(--foreground-soft)' }}>{review.tags.join(', ')}</p>
          )}
        </div>
      </div>

      <div className="prose max-w-none" style={{ color: 'var(--foreground)' }}>
        <div className="whitespace-pre-wrap">{review.content}</div>
      </div>

      <PageNav
        back={{ href: '/reviews', label: '← Back to all reviews' }}
        prev={prevReview ? { href: `/reviews/${prevReview.slug}`, label: `← Previous: ${prevReview.title}` } : undefined}
        next={nextReview ? { href: `/reviews/${nextReview.slug}`, label: `Next: ${nextReview.title} →` } : undefined}
      />
    </article>
  )
}
