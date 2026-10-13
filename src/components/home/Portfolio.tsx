import 'bootstrap/js/dist/modal'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import gamesData from '../../assets/data/games.json'
import { getChangelogs } from '../../data/changelogs'
import type { Game, Language } from '../../types/content'
import AppIcon from '../AppIcon'
import GameCard from '../games/GameCard'

export default function Portfolio() {
  const { t, i18n } = useTranslation()
  const [selected, setSelected] = useState<Game | null>(null)
  const language = (i18n.language.startsWith('en') ? 'en' : 'es') as Language
  const portfolioImagesPath = './images/portfolio/'
  const games = gamesData.games as Game[]
  return <section id="portfolio"><div className="container">
    <div className="row"><h2 className="col-12 centered">{t('portfolio.title')}</h2><hr /><div className="col-12 centered"><p className="large">{t('portfolio.text')}</p></div></div>
    <div className="row justify-content-center">{games.map((game) => <div className="col-12 col-md-6 col-lg-4 mb-4" key={game.modalId}><div className="grid">
      {game.detailPage && game.slug
        ? <Link className="portfolio-card portfolio-card-trigger" to={`/juegos/${game.slug}`}><GameCard game={game} /></Link>
        : <button type="button" className="portfolio-card portfolio-card-trigger" data-bs-toggle="modal" data-bs-target="#gameModal" onClick={() => setSelected(game)}><GameCard game={game} /></button>}
    </div></div>)}</div>
  </div>
  <div className="modal fade" id="gameModal" tabIndex={-1} aria-hidden="true"><div className="modal-dialog"><div className="modal-content">
    <div className="modal-header"><h4 className="modal-title">{selected?.title}</h4><button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label={t('common.close')} /></div>
    {selected && <div className="modal-body centered"><p><img className="img-responsive portfolio-card" src={portfolioImagesPath + selected.imgSrc} alt={selected.altText} /></p><p className="modal-text" dangerouslySetInnerHTML={{ __html: selected.description[language] }} />
      {selected.link.map((link) => <a href={link.url} className="btn btn-stores my-1 me-1" key={link.url}><AppIcon name={link.icon} /> {selected.playOn[language]} {link.store}</a>)}
      {getChangelogs(selected.slug || selected.modalId).length > 0 && <a className="btn btn-stores my-1 me-1" href={`${import.meta.env.BASE_URL}juegos/${selected.slug || selected.modalId}/changelogs`}>{t('changelogs.button')}</a>}
    </div>}
  </div></div></div>
  </section>
}
