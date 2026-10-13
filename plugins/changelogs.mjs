import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const sections = ['news', 'improvements', 'fixes']
const languages = ['es', 'en']

function readEntries(directory) {
  if (!existsSync(directory)) return []
  return readdirSync(directory)
    .filter((file) => file.endsWith('.json'))
    .map((file) => {
      const version = file.slice(0, -5)
      const path = resolve(directory, file)
      const content = JSON.parse(readFileSync(path, 'utf8'))
      const invalid = () => { throw new Error('Invalid changelog: ' + path) }
      if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(version)) invalid()
      if (!content || typeof content !== 'object' || Array.isArray(content)) invalid()
      if (Object.keys(content).some((key) => !['date', 'title', ...sections].includes(key))) invalid()
      if (typeof content.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(content.date)) invalid()
      const date = new Date(content.date + 'T00:00:00Z')
      if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== content.date) invalid()
      for (const language of languages) {
        if (typeof content.title?.[language] !== 'string' || !content.title[language].trim()) invalid()
        for (const section of sections) {
          const items = content[section]?.[language]
          if (!Array.isArray(items) || items.some((item) => typeof item !== 'string' || !item.trim())) invalid()
        }
        if (!sections.some((section) => content[section][language].length > 0)) invalid()
      }
      return { ...content, version }
    })
    .sort((a, b) => b.version.localeCompare(a.version, 'en', { numeric: true }))
}

function createFeeds(config) {
  const games = JSON.parse(readFileSync(resolve(config.root, 'src/assets/data/games.json'), 'utf8')).games
  const directory = resolve(config.root, 'src/assets/changelogs')
  const gameIds = new Set(games.map((game) => game.slug || game.modalId))
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && !gameIds.has(entry.name)) {
      throw new Error('Unknown changelog game: ' + entry.name)
    }
  }
  const base = config.base === './' || config.base === '' ? '/' : new URL(config.base, 'https://example.invalid').pathname
  return games.map((game) => {
    const gameId = game.slug || game.modalId
    const entries = readEntries(resolve(directory, gameId))
    const historyUrl = base + 'juegos/' + gameId + '/changelogs'
    const latest = entries[0]
    return {
      fileName: 'changelogs/' + gameId + '/latest.json',
      source: JSON.stringify({
        schemaVersion: 1,
        gameId,
        historyUrl,
        latest: latest ? { ...latest, url: historyUrl + '#version-' + latest.version } : null,
      }, null, 2) + '\n',
    }
  })
}

export default function changelogs() {
  let config
  return {
    name: 'game-changelogs',
    configResolved(resolved) { config = resolved },
    buildStart() { createFeeds(config) },
    generateBundle() {
      for (const feed of createFeeds(config)) {
        this.emitFile({ type: 'asset', ...feed })
      }
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const pathname = new URL(request.url || '/', 'http://localhost').pathname
        const base = config.base === './' || config.base === '' ? '/' : new URL(config.base, 'https://example.invalid').pathname
        if (!pathname.startsWith(base + 'changelogs/')) return next()
        try {
          const feed = createFeeds(config).find((item) => base + item.fileName === pathname)
          if (!feed) return next()
          response.setHeader('Content-Type', 'application/json; charset=utf-8')
          response.setHeader('Cache-Control', 'no-cache')
          response.end(feed.source)
        } catch (error) {
          next(error)
        }
      })
    },
  }
}
