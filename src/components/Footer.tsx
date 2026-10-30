import { useTranslation } from 'react-i18next'
import socialsData from '../assets/data/socials.json'
import type { Social } from '../types/content'
import AppIcon from './AppIcon'

export default function Footer() {
  const { t } = useTranslation()
  const socials = socialsData.socials as Social[]
  return <footer id="footer"><div className="container"><div className="row">
    <div className="col-md-4 footer-links"><ul className="list-inline">
      <li className="list-inline-item"><a href="https://press.ibisinteractive.cl">{t('footer.presskit')}</a></li>
      <li className="list-inline-item"><a href="/politicas-privacidad">{t('footer.privacy')}</a></li>
      <li className="list-inline-item"><a href="/social">{t('footer.social')}</a></li>
    </ul></div>
    <div className="col-md-4 offset-md-4"><span>{t('footer.contact')}</span><ul className="list-inline social-buttons">
      {socials.map((social) => <li className="list-inline-item" key={social.name}><a href={social.url} aria-label={social.aria}><AppIcon name={social.icon} /></a></li>)}
    </ul></div>
  </div></div></footer>
}
