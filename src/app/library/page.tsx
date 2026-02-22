export const metadata = {
  title: "My Library | Jwan's Book Nook",
  description: 'Search for books, add to your collection, track papers and notes',
}

const LIBRARY_URL = 'https://drmahmoodhachim-gif.github.io/jwan-library/'

export default function LibraryPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">My Library</h1>
        <p className="text-gray-600 mt-1">
          Search the internet for books, add them to your collection, and track papers and notes.
        </p>
      </div>
      <div className="rounded-lg overflow-hidden border border-gray-200 bg-white">
        <iframe
          src={LIBRARY_URL}
          title="Jwan's Library - Search and collect books"
          className="w-full min-h-[calc(100vh-16rem)] border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          referrerPolicy="no-referrer"
        />
      </div>
      <p className="text-sm text-gray-500">
        If the library does not load,{' '}
        <a
          href={LIBRARY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          open it in a new tab
        </a>
        .
      </p>
    </div>
  )
}
