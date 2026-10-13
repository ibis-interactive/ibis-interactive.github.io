import { useEffect } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from '../components/Layout'
import gamesData from '../assets/data/games.json'
import { getChangelogs } from '../data/changelogs'
import type { Game, Language } from '../types/content'
import './ChangelogsPage.css'

const sections = ['news', 'improvements', 'fixes'] as const

export default function ChangelogsPage() {
  const { gameId } = useParams()
  const { hash } = useLocation()
  const { t, i18n } = useTranslation()
  const language: Language = i18n.language.startsWith('en') ? 'en' : 'es'
  const game = (gamesData.games as Game[]).find((item) => (item.slug || item.modalId) === gameId)

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [gameId, hash])

  if (!game) return <Navigate to="/" replace />

  const changelogs = getChangelogs(game.slug || game.modalId)

  return <Layout><main className="container changelogs-page">
    <Link to={game.detailPage && game.slug ? `/juegos/${game.slug}` : '/#portfolio'}>{t('changelogs.back')}</Link>
    <h1>{t('changelogs.title', { game: game.title })}</h1>
    {changelogs.length === 0 && <p>{t('changelogs.empty')}</p>}
    {changelogs.map((entry) => <article key={entry.version} id={`version-${entry.version}`}>
      <h2><a href={`#version-${entry.version}`}>{t('changelogs.version', { version: entry.version })}</a></h2>
      <time dateTime={entry.date}>{new Intl.DateTimeFormat(language, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${entry.date}T00:00:00Z`))}</time>
      <h3>{entry.title[language]}</h3>
      {sections.map((section) => entry[section][language].length > 0 && <section key={section}>
        <h4>{t(`changelogs.${section}`)}</h4>
        <ul>{entry[section][language].map((item, index) => <li key={index}>{item}</li>)}</ul>
      </section>)}
    </article>)}
  </main></Layout>
}
