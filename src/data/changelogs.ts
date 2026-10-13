import type { ChangelogContent } from '../types/changelog'

const files = import.meta.glob<ChangelogContent>('../assets/changelogs/*/*.json', {
  import: 'default',
  eager: true,
})

export function getChangelogs(gameId: string) {
  return Object.entries(files)
    .filter(([path]) => path.split('/').at(-2) === gameId)
    .map(([path, content]) => ({
      ...content,
      version: path.split('/').at(-1)!.slice(0, -5),
    }))
    .sort((a, b) => b.version.localeCompare(a.version, 'en', { numeric: true }))
}
