export type Language = 'es' | 'en'
export type LocalizedText = Record<Language, string>

export interface LinkData { href?: string; url?: string; icon: string; store?: string; label?: LocalizedText }
export interface GameDetailLink { url: string; label: LocalizedText; primary?: boolean }
export interface GameDetailImages { folder: string; hero: string; logo: string; gallery: string[] }
export interface GameFacts { release: LocalizedText; players: LocalizedText; platform: string; languages: LocalizedText }
export interface Game {
  slug?: string
  detailPage?: boolean
  title: string
  imgSrc: string
  altText: string
  modalId: string
  description: LocalizedText
  link: LinkData[]
  playOn: LocalizedText
  summary?: LocalizedText
  features?: Record<Language, string[]>
  detailImages?: GameDetailImages
  detailLinks?: GameDetailLink[]
  facts?: GameFacts
}
export interface Role { icon: string; name: LocalizedText }
export interface TeamMember { name: string; img: string; roles: Role[]; description: LocalizedText; favorites: LocalizedText; links: LinkData[] }
export interface Social { name: string; url: string; aria: string; icon: string }
