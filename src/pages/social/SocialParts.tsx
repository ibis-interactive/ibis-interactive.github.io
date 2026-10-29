import { FaArrowRight } from 'react-icons/fa6'
import AppIcon from '../../components/AppIcon'
import { featuredGame, socialLinks, type SocialCopy } from './content'

export function Brand({ text }: { text: SocialCopy }) {
  return <header className="social-brand">
    <img src="/images/logos/png/logo_base.webp" alt="" width="88" height="88" />
    <h1>Ibis Interactive</h1><p>{text.intro}</p>
  </header>
}

export function SocialLinks() {
  return <div className="social-networks">{socialLinks.map(link => <a key={link.name} href={link.url} aria-label={link.aria}><AppIcon name={link.icon} /><span>{link.name}</span></a>)}</div>
}

export function Destinations({ text }: { text: SocialCopy }) {
  return <div className="social-destinations">
    <a href={featuredGame.link[0].url}><AppIcon name="steam" /><span>{text.steam}<small>{text.steamGame}</small></span><FaArrowRight /></a>
    <a href="https://press.ibisinteractive.cl"><AppIcon name="bullhorn" /><span>{text.press}</span><FaArrowRight /></a>
    <a href="mailto:contacto@ibisinteractive.cl"><AppIcon name="envelope" /><span>{text.contact}</span><FaArrowRight /></a>
  </div>
}

export function GameFeature({ text }: { text: SocialCopy }) {
  return <a className="social-feature" href="/juegos/don-pepe-y-sus-globos">
    <img src="/images/main-game/cover_horizontal.webp" alt="Don Pepe y sus globos" />
    <span>{text.game}<FaArrowRight /></span>
  </a>
}
