import { useEffect } from 'react'
import { getCanonicalUrl, socialPreviewUrl } from '../data/site'

export type DocumentMetadata = {
  title: string
  description: string
  pathname: string
}

const setMetaContent = (key: string, content: string) => {
  document.querySelector<HTMLMetaElement>(`meta[data-route-meta="${key}"]`)?.setAttribute('content', content)
}

export function useDocumentMetadata({ title, description, pathname }: DocumentMetadata) {
  useEffect(() => {
    document.title = title
    setMetaContent('description', description)
    setMetaContent('og-title', title)
    setMetaContent('og-description', description)
    setMetaContent('og-image', socialPreviewUrl)
    setMetaContent('twitter-title', title)
    setMetaContent('twitter-description', description)
    setMetaContent('twitter-image', socialPreviewUrl)
    document
      .querySelector<HTMLLinkElement>('link[data-route-meta="canonical"]')
      ?.setAttribute('href', getCanonicalUrl(pathname))
  }, [description, pathname, title])
}
