import { useTranslation } from 'react-i18next'
import teamData from '../../assets/data/team.json'
import type { Language, TeamMember } from '../../types/content'
import AppIcon from '../AppIcon'

export default function Team() {
  const { t, i18n } = useTranslation()
  const language = (i18n.language.startsWith('en') ? 'en' : 'es') as Language
  const members = teamData.teamMembers as TeamMember[]
  return <section id="team"><div className="container"><div className="row centered">
    <h2 className="col-12 centered">{t('team.title')}</h2><hr />
    <div className="row justify-content-center">{members.map((member) => <article className="col-lg-4 centered pad" key={member.name}>
      <img loading="lazy" decoding="async" className="img img-circle" src={`./images/team/${member.img}`} height="120" width="120" alt={`${t('team.member')} ${member.name}`} />
      <h4><strong>{member.name}</strong></h4>
      <h6>{member.roles.map((role, index) => <span key={role.name.en}>{index > 0 && ' - '}{role.name[language]} <AppIcon name={role.icon} /></span>)}</h6>
      <p>{member.description[language]}<br /><strong>{t('team.favorites')}:</strong> {member.favorites[language]}</p>
      {member.links.map((link) => <a href={link.href} aria-label={link.label?.[language]} key={link.href}><AppIcon name={link.icon} /></a>)}
    </article>)}</div>
  </div></div></section>
}
