import type { Language, LocalizedText } from './content'

export interface ChangelogContent {
  date: string
  title: LocalizedText
  news: Record<Language, string[]>
  improvements: Record<Language, string[]>
  fixes: Record<Language, string[]>
}

export interface Changelog extends ChangelogContent {
  version: string
}
