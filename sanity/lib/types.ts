export interface SanityImage {
  asset: {
    _id: string
    url: string
    metadata?: {
      dimensions?: {
        width: number
        height: number
      }
      lqip?: string
    }
  }
  alt: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    width: number
    height: number
  }
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
}

export interface SanityFile {
  asset: {
    url: string
    originalFilename?: string
    size?: number
  }
}

export interface CTA {
  _key: string
  label: string
  url: string
  external?: boolean
}

export interface Social {
  platform: string
  url: string
}

export interface Stat {
  _key: string
  label: string
  value: string
  suffix?: string
}

export interface TimelineItem {
  _key: string
  year?: string
  phase?: string
  startDate?: string
  endDate?: string
  title: string
  description?: string
}

export interface AwardItem {
  _key: string
  title: string
  organization: string
  year: string
  description?: string
}

export interface PressItem {
  _key: string
  title: string
  publication: string
  url?: string
  date: string
  excerpt?: string
}

export interface Download {
  _key: string
  label: string
  file: SanityFile
}

export interface SEO {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: SanityImage
}

export interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  heroImage: SanityImage
  heroVideo?: string
  excerpt?: string
  overview?: any // Portable Text
  challenge?: any // Portable Text
  solution?: any // Portable Text
  category?: Category
  services?: string[]
  materials?: string[]
  dimensions?: string
  weight?: string
  year?: string
  location?: string
  timeline?: TimelineItem[]
  gallery?: SanityImage[]
  coverVideo?: string
  credits?: string[]
  collaborators?: string
  awards?: AwardItem[]
  pressLinks?: PressItem[]
  sustainability?: any // Portable Text
  downloads?: Download[]
  seo?: SEO
  featured?: boolean
  order?: number
}

export interface Author {
  _id: string
  name: string
  image?: SanityImage
  bio?: string
  email?: string
}

export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage?: SanityImage
  gallery?: SanityImage[]
  excerpt?: string
  publishedAt: string
  body?: any // Portable Text
  author?: Author
  categories?: Category[]
  seo?: SEO
}