import Link from 'next/link'
import { getAllReviews } from '@/lib/reviews'

export default function HomePage() {
  const reviews = getAllReviews()
  const featured = reviews[0]

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold mb-4">Welcome to Jwan&apos;s Book Nook</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Hi! I love reading and sharing what I think about books. 
          I also draw comics sometimes. Enjoy exploring!
        </p>
      </section>

      {featured && (
        <section className="border-2 border-gray-200 rounded-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">What I&apos;m reading now</h2>
          <div className="flex gap-6 flex-wrap">
            <div className="w-24 h-36 bg-gray-100 rounded flex items-center justify-center text-4xl shrink-0">
              {featured.cover ? (
                <img src={assetPath(featured.cover)} alt="" className="w-full h-full object-cover rounded" />
              ) : (
                '📖'
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{featured.title}</h3>
              <p className="text-gray-600">{featured.author}</p>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < featured.rating ? 'text-amber-500' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
              </div>
              <Link href={`/reviews/${featured.slug}`} className="mt-3 inline-block text-blue-600 hover:underline">
                Read my full review →
              </Link>
            </div>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-4">My Book Reviews</h2>
        <p className="text-gray-600 mb-4">Click a book to read my full review.</p>
        <Link href="/reviews" className="inline-block px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700">
          View all reviews
        </Link>
      </section>

      <section className="border border-gray-200 rounded-lg p-6 bg-white">
        <h2 className="text-xl font-semibold mb-2">Have a question?</h2>
        <p className="text-gray-600 mb-4">Use the Ask Jwan form to send me a message. A parent checks messages first.</p>
        <Link href="/ask-jwan" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Ask Jwan
        </Link>
      </section>
    </div>
  )
}
