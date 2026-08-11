import { useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import { donPepeCharacters } from '../../../assets/data/don-pepe-characters'
import type { DonPepeCharacter } from '../../../assets/data/don-pepe-characters'

const labels = {
  es: { title: 'Personajes', previous: 'Anterior', next: 'Siguiente', power: 'Ataque', defense: 'Defensa', agility: 'Agilidad', maxCurve: 'Curva Máxima', stamina: 'Resistencia' },
  en: { title: 'Characters', previous: 'Previous', next: 'Next', power: 'Power', defense: 'Defense', agility: 'Agility', maxCurve: 'Max Curve', stamina: 'Stamina' },
}

interface DonPepeSectionsProps {
  language: 'es' | 'en'
}

export default function DonPepeSections({ language }: DonPepeSectionsProps) {
  const [selectedId, setSelectedId] = useState('leo')
  const rosterRef = useRef<HTMLDivElement>(null)
  const text = labels[language]
  const selectedIndex = Math.max(0, donPepeCharacters.findIndex(({ id }) => id === selectedId))
  const selected = donPepeCharacters[selectedIndex]

  const selectCharacter = (index: number, focus = false) => {
    const nextIndex = (index + donPepeCharacters.length) % donPepeCharacters.length
    setSelectedId(donPepeCharacters[nextIndex].id)

    const roster = rosterRef.current
    const button = roster?.querySelectorAll<HTMLButtonElement>('button')[nextIndex]
    if (!roster || !button) return

    if (focus) button.focus({ preventScroll: true })
    roster.scrollTo({
      left: button.offsetLeft - (roster.clientWidth - button.offsetWidth) / 2,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  const handleRosterKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    const buttons = Array.from(event.currentTarget.querySelectorAll('button'))
    const focusedIndex = buttons.indexOf(event.target as HTMLButtonElement)
    if (focusedIndex < 0) return
    event.preventDefault()
    const nextIndex = event.key === 'Home' ? 0
      : event.key === 'End' ? donPepeCharacters.length - 1
        : focusedIndex + (event.key === 'ArrowLeft' ? -1 : 1)
    selectCharacter(nextIndex, true)
  }

  return <section className="don-pepe-roster" aria-labelledby="don-pepe-roster-title">
    <div className="container">
      <h2 id="don-pepe-roster-title">{text.title}</h2>
      <CharacterDetail character={selected} labels={text} />
      <div className="don-pepe-roster-navigation">
        <button type="button" onClick={() => selectCharacter(selectedIndex - 1)}>{text.previous}</button>
        <span role="status" aria-live="polite" aria-atomic="true">
          <span className="visually-hidden">{selected.name}: </span>
          {selectedIndex + 1} / {donPepeCharacters.length}
        </span>
        <button type="button" onClick={() => selectCharacter(selectedIndex + 1)}>{text.next}</button>
      </div>
      <div className="don-pepe-character-grid" aria-label={text.title} onKeyDown={handleRosterKeyDown} ref={rosterRef}>
        {donPepeCharacters.map((character, index) => <button
          className="don-pepe-character-card"
          type="button"
          aria-pressed={selected.id === character.id}
          aria-controls="don-pepe-character-detail"
          onClick={() => selectCharacter(index)}
          key={character.id}
        >
          <CharacterPortrait character={character} />
          <span>{character.name}</span>
        </button>)}
      </div>
    </div>
  </section>
}

function CharacterPortrait({ character }: { character: DonPepeCharacter }) {
  return character.image
    ? <img src={character.image} alt="" />
    : <span className="don-pepe-character-placeholder" aria-hidden="true">{character.name.slice(0, 2)}</span>
}

function CharacterDetail({ character, labels: text }: { character: DonPepeCharacter; labels: typeof labels.es }) {
  return <article id="don-pepe-character-detail" className="don-pepe-character-detail" aria-labelledby="don-pepe-character-name" style={{ '--character-color': character.color } as CSSProperties}>
    <div className="don-pepe-character-art"><CharacterPortrait character={character} /></div>
    <div className="don-pepe-character-info">
      <h3 id="don-pepe-character-name">{character.name}</h3>
      <dl>{Object.entries(character.stats).map(([stat, value]) => <div key={stat}>
        <dt>{text[stat as keyof DonPepeCharacter['stats']]}</dt>
        <dd>
          <span className="visually-hidden">{Math.round(value * 100)} / 100</span>
          <span className="don-pepe-stat-track" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => {
              const fill = Math.min(1, Math.max(0, value * 5 - index))
              return <span className="don-pepe-stat-segment" key={index}>
                <span style={{ width: `${fill * 100}%` }} />
              </span>
            })}
          </span>
        </dd>
      </div>)}</dl>
    </div>
  </article>
}
