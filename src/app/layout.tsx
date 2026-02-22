import type { Metadata } from 'next'
import './globals.css'
import { ReadingPreferences } from '@/components/ReadingPreferences'
import { Nav } from '@/components/Nav'

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
      <body className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <header>
          <ReadingPreferences />
          <Nav />
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
