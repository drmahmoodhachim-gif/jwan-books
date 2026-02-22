import fs from 'fs'
import path from 'path'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { assetPath } from '@/lib/assetPath'

const albumDir = path.join(process.cwd(), 'public/jwan-reading')

function getAlbumImages(): string[] {
  if (!fs.existsSync(albumDir)) return []
  return fs.readdirSync(albumDir)
    .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
    .sort()
    .map(f => assetPath(`/jwan-reading/${f}`))
}

export const metadata = {
  title: "Jwan Reading | Jwan's Book Nook",
  description: 'Photos of Jwan reading',
}

export default function JwanReadingPage() {
  const images = getAlbumImages()

  return (
    <div>
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: 'Jwan Reading' }]} />
      <h1 className="text-3xl font-bold mb-4">Jwan Reading</h1>
      <p className="mb-8" style={{ color: 'var(--foreground-soft)' }}>
        Photos of Jwan enjoying books.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <figure key={i} className="rounded-lg overflow-hidden border border-[var(--border)]" style={{ backgroundColor: 'var(--paper)' }}>
            <img
              src={src}
              alt={`Jwan reading ${i + 1}`}
              className="w-full aspect-square object-cover block"
            />
          </figure>
        ))}
      </div>

      {images.length === 0 && (
        <p style={{ color: 'var(--foreground-soft)' }}>No photos yet.</p>
      )}
    </div>
  )
}
