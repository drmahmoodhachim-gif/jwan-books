import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Jwan's Book Nook",
  description: 'Book reviews and comics by Jwan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#faf9f7] text-gray-800 font-sans antialiased">
        <LibraryProvider>
          <header className="border-b border-gray-200 bg-white">
            <nav className="max-w-4xl mx-auto px-4 py-4 flex flex-wrap gap-4 items-center">
              <Link href="/" className="font-semibold text-lg">Jwan&apos;s Book Nook</Link>
              <Link href="/reviews" className="text-gray-600 hover:text-gray-900">My Book Reviews</Link>
              <LibraryNavButton />
              <Link href="/comics" className="text-gray-600 hover:text-gray-900">Comics Corner</Link>
              <Link href="/ask-jwan" className="text-gray-600 hover:text-gray-900">Ask Jwan</Link>
              <Link href="/jwan-reading" className="text-gray-600 hover:text-gray-900">Jwan Reading</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About Me</Link>
            </nav>
          </header>
          <main className="max-w-4xl mx-auto px-4 py-8">
            {children}
          </main>
        </LibraryProvider>
      </body>
    </html>
  )
}
