import { Brand, Destinations, GameFeature, SocialLinks } from './SocialParts'
import type { SocialCopy } from './content'

export default function Classic({ text }: { text: SocialCopy }) {
  return <div className="social-classic"><Brand text={text} /><GameFeature text={text} /><Destinations text={text} /><SocialLinks /></div>
}
