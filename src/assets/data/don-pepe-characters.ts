export type DonPepeCharacterPattern = 'dots' | 'diagonal' | 'grid' | 'waves' | 'honeycomb' | 'cross' | 'rhombus' | 'polka' | 'stars' | 'paper-dotted' | 'stripes' | 'clouds' | 'hex-links' | 'ring-links' | 'basket-weave'

export interface DonPepeCharacter {
  id: string
  name: string
  image?: string
  color: string
  pattern: DonPepeCharacterPattern
  stats: {
    power: number
    defense: number
    agility: number
    maxCurve: number
    stamina: number
  }
}

export const donPepeCharacters: DonPepeCharacter[] = [
  { id: 'hana', name: 'Hana', image: '/images/games/don-pepe-y-sus-globos/characters/hana.png', color: '#f2aece', pattern: 'honeycomb', stats: { power: 0.6, defense: 0.6, agility: 0.6, maxCurve: 0.6, stamina: 0.6 } },
  { id: 'leo', name: 'Leo', image: '/images/games/don-pepe-y-sus-globos/characters/leo.png', color: '#8495e7', pattern: 'basket-weave', stats: { power: 0.7, defense: 0.4, agility: 0.55, maxCurve: 0.7, stamina: 0.4 } },
  { id: 'nat', name: 'Nat', image: '/images/games/don-pepe-y-sus-globos/characters/nat.png', color: '#fbc46f', pattern: 'stars', stats: { power: 0.55, defense: 0.6, agility: 0.7, maxCurve: 0.45, stamina: 0.7 } },
  { id: 'alex', name: 'Alex', image: '/images/games/don-pepe-y-sus-globos/characters/alex.png', color: '#639765', pattern: 'hex-links', stats: { power: 0.5, defense: 0.4, agility: 0.85, maxCurve: 0.7, stamina: 0.5 } },
  { id: 'bandurria', name: 'Bandurria', image: '/images/games/don-pepe-y-sus-globos/characters/bandurria.png', color: '#ff4646', pattern: 'clouds', stats: { power: 0.5, defense: 0.25, agility: 1.0, maxCurve: 0.66, stamina: 0.75 } },
  { id: 'panchito', name: 'Panchito', image: '/images/games/don-pepe-y-sus-globos/characters/panchito.png', color: '#63d2be', pattern: 'waves', stats: { power: 0.6, defense: 0.85, agility: 0.4, maxCurve: 0.75, stamina: 0.4 } },
  { id: 'clemente', name: 'Clemente', image: '/images/games/don-pepe-y-sus-globos/characters/clemente.png', color: '#404694', pattern: 'cross', stats: { power: 1, defense: 0.55, agility: 0.4, maxCurve: 0.0, stamina: 0.45 } },
  { id: 'ivan', name: 'Ivan', image: '/images/games/don-pepe-y-sus-globos/characters/ivan.png', color: '#f38354', pattern: 'rhombus', stats: { power: 0.55, defense: 0.5, agility: 0.65, maxCurve: 0.8, stamina: 0.65 } },
  { id: 'laura', name: 'Laura', image: '/images/games/don-pepe-y-sus-globos/characters/laura.png', color: '#87ff68', pattern: 'ring-links', stats: { power: 0.3, defense: 0.75, agility: 0.8, maxCurve: 0.3, stamina: 0.75 } },
]
