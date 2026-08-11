import type { ComponentType } from 'react'
import type { Game, Language } from '../../../types/content'
import DonPepeSections from './DonPepeSections'

export interface GameSpecificSectionsProps {
  game: Game
  language: Language
  imagePath: string
}

const sectionsBySlug: Record<string, ComponentType<GameSpecificSectionsProps>> = {
  'don-pepe-y-sus-globos': DonPepeSections,
}

export default function GameSpecificSections(props: GameSpecificSectionsProps) {
  const Sections = props.game.slug ? sectionsBySlug[props.game.slug] : undefined

  return Sections ? <Sections {...props} /> : null
}
