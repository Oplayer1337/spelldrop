export const siteUrl = 'https://oplayer1337.ru'

export const socialPreviewUrl = new URL('/social-preview.png', siteUrl).toString()

export function getCanonicalUrl(pathname: string) {
  const normalizedPath = pathname === '/' ? '/' : `/${pathname.replace(/^\/+|\/+$/g, '')}`

  return new URL(normalizedPath, siteUrl).toString()
}
