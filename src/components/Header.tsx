import { useTranslation } from 'react-i18next'
import AppIcon from './AppIcon'

const links = [['home-section', 'nav.home'], ['about', 'nav.about'], ['portfolio', 'nav.portfolio'], ['team', 'nav.team']]

export default function Header() {
  const { t, i18n } = useTranslation()
  const changeLanguage = (language: string) => void i18n.changeLanguage(language)
  return <>
    <nav className="navbar navbar-inverse navbar-expand-md fixed-top">
      <div className="container-fluid px-md-2">
        <a className="navbar-brand" href="/" aria-label={t('brand.homeLabel')}>
          <img id="brandImg" src="/images/about/ibis.png" alt=""/><span>{t('brand.name')}</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label={t('nav.open')}><AppIcon name="fa-bars" /></button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarToggler">
          <ul className="navbar-nav mb-2 mb-md-0">
            {links.map(([section, key]) => <li className="nav-item" key={section}><a href={`/#${section}`} className="nav-link">{t(key)}</a></li>)}
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle border-0 bg-transparent" data-bs-toggle="dropdown" aria-expanded="false">{i18n.language.toUpperCase()}</button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><button className="dropdown-item" onClick={() => changeLanguage('es')}>ES - Español</button></li>
                <li><button className="dropdown-item" onClick={() => changeLanguage('en')}>EN - English</button></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div id="navbarSpacer" />
  </>
}
