import fs from 'fs'
import path from 'path'

const comicsDir = path.join(process.cwd(), 'public/comics')

function getComicImages(): string[] {
  if (!fs.existsSync(comicsDir)) return []
  return fs.readdirSync(comicsDir)
    .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
    .map(f => `/comics/${f}`)
}

export default function ComicsPage() {
  const comics = getComicImages()

  return (
    <div>
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: 'Comics Corner' }]} />
      <h1 className="text-3xl font-bold mb-4">Comics Corner</h1>
      <p className="text-gray-600 mb-8">
        Drawings and comics by Jwan. Add images to the public/comics folder to show them here.
      </p>

      <div className="space-y-8">
        {comics.map((src, i) => (
          <figure key={i} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <img src={src} alt={`Comic ${i + 1}`} className="w-full max-w-2xl mx-auto block" />
            <figcaption className="p-3 text-sm text-gray-500 border-t">
              Comic {i + 1}
            </figcaption>
          </figure>
        ))}
      </div>

      {comics.length === 0 && (
        <p className="text-gray-500">No comics yet. Add images to public/comics/ to get started.</p>
      )}
    </div>
  )
}
