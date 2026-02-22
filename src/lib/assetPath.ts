/** basePath for production (GitHub Pages project site) */
export const basePath = process.env.NODE_ENV === 'production' ? '/jwan-books' : ''

/** Prefix asset paths for correct URLs when deployed with basePath */
export function assetPath(path: string): string {
  if (!path) return path
  return path.startsWith('/') ? `${basePath}${path}` : `${basePath}/${path}`
}
