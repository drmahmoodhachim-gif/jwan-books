import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const reviewsDir = path.join(process.cwd(), 'content/reviews')

export interface Review {
  slug: string
  title: string
  author: string
  rating: number
  date: string
  cover: string
  tags: string[]
  content: string
}

export function getReviewSlugs(): string[] {
  if (!fs.existsSync(reviewsDir)) return []
  return fs.readdirSync(reviewsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}

export function getReviewBySlug(slug: string): Review | null {
  try {
    const filePath = path.join(reviewsDir, `${slug}.md`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    return {
      slug,
      title: data.title || 'Untitled',
      author: data.author || '',
      rating: data.rating || 0,
      date: data.date || '',
      cover: data.cover || '',
      tags: data.tags || [],
      content,
    }
  } catch {
    return null
  }
}

export function getAllReviews(): Review[] {
  const slugs = getReviewSlugs()
  return slugs
    .map(slug => getReviewBySlug(slug))
    .filter((r): r is Review => r !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
