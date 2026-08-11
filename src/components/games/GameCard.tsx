import type { Game } from '../../types/content'

const portfolioImagesPath = `${import.meta.env.BASE_URL}images/portfolio/`

export default function GameCard({ game }: { game: Game }) {
  return <>
    <img className="img-responsive" src={`${portfolioImagesPath}${game.imgSrc}`} alt={game.altText} />
    <span className="btn btn-default">{game.title}</span>
  </>
}
