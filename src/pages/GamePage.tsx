import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import gamesData from '../assets/data/games.json'
import { getChangelogs } from '../data/changelogs'
import Layout from '../components/Layout'
import '../game-detail.css'
import GameSpecificSections from '../components/games/details/GameSpecificSections'
import GameGallery from '../components/games/details/GameGallery'
import type { Game, Language } from '../types/content'

export default function GamePage() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const language = (i18n.language.startsWith('en') ? 'en' : 'es') as Language
  const game = (gamesData.games as Game[]).find((item) => item.detailPage && item.slug === slug)

  if (!game?.summary || !game.features || !game.detailImages || !game.detailLinks || !game.facts) {
    return <Navigate to="/" replace />
  }

  const imagePath = `${import.meta.env.BASE_URL}images/games/${game.detailImages.folder}/`
  return <Layout><main className="game-detail">
    <section className="game-detail-hero">
      <img className="game-detail-hero-background" fetchPriority="high" src={`${imagePath}${game.detailImages.hero}`} alt="" />
      <div className="container game-detail-hero-content">
        <img className="game-detail-logo" src={`${imagePath}${game.detailImages.logo}`} alt={game.title} />
        <p>{game.summary[language]}</p>
        <div className="game-detail-actions">{game.detailLinks.map((link) => <a
          className={`btn ${link.primary ? 'game-detail-primary' : 'game-detail-secondary'}`}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          key={link.url}
        >{link.label[language]}</a>)}
          {getChangelogs(game.slug || game.modalId).length > 0 && <Link className="btn game-detail-secondary" to={`/juegos/${game.slug}/changelogs`}>{t('changelogs.button')}</Link>}
        </div>
      </div>
    </section>

    <section className="container game-detail-overview">
      <div className="row g-5">
        <article className="col-lg-8">
          <h1>{game.title}</h1>
          <p className="game-detail-lead" dangerouslySetInnerHTML={{ __html: game.description[language] }} />
          <h2>{t('gamePage.features')}</h2>
          <ul className="game-detail-features">{game.features[language].map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </article>
        <aside className="col-lg-4"><div className="game-detail-facts">
          <h2>{t('gamePage.facts.title')}</h2>
          <dl>
            <div><dt>{t('gamePage.facts.release')}</dt><dd>{game.facts.release[language]}</dd></div>
            <div><dt>{t('gamePage.facts.players')}</dt><dd>{game.facts.players[language]}</dd></div>
            <div><dt>{t('gamePage.facts.platform')}</dt><dd>{game.facts.platform}</dd></div>
            <div><dt>{t('gamePage.facts.languages')}</dt><dd>{game.facts.languages[language]}</dd></div>
          </dl>
        </div></aside>
      </div>
    </section>

    <GameSpecificSections game={game} language={language} imagePath={imagePath} />

    <GameGallery key={game.slug} images={game.detailImages.gallery} imagePath={imagePath} title={game.title} />
  </main></Layout>
}
