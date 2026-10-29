import socials from '../../assets/data/socials.json'
import games from '../../assets/data/games.json'

export const socialLinks = socials.socials
export const featuredGame = games.games[0]
export const copy = {
  es: {
    intro: 'Videojuegos desde Valdivia, Chile',
    steam: 'Ver en Steam', steamGame: 'Don Pepe y sus globos', game: 'Descubre Don Pepe y sus globos',
    press: 'Prensa y recursos', contact: 'Conversemos',
    share: 'Copiar enlace', copied: 'Enlace copiado', failed: 'No se pudo copiar el enlace.',
    back: 'Volver al sitio', language: 'Cambiar idioma',
    qr: { open: 'Mostrar QR', title: 'Compartir con QR', alt: 'Codigo QR de la pagina social de Ibis Interactive', close: 'Cerrar', copy: 'Copiar enlace' },
  },
  en: {
    intro: 'Games from Valdivia, Chile.',
    steam: 'View on Steam', steamGame: 'Don Pepe and his balloons', game: 'Discover Don Pepe and his balloons',
    press: 'Press and resources', contact: 'Get in touch',
    share: 'Copy link', copied: 'Link copied', failed: 'Could not copy the link.',
    back: 'Back to website', language: 'Change language',
    qr: { open: 'Show QR', title: 'Share with QR', alt: 'QR code for the Ibis Interactive social page', close: 'Close', copy: 'Copy link' },
  },
}
export type SocialCopy = typeof copy.es

