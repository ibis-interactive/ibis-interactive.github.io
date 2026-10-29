import { imageSrcSet } from '../../data/responsive-images'
import type { Game } from '../../types/content'

const portfolioImagesPath = `${import.meta.env.BASE_URL}images/portfolio/`

export default function GameCard({ game }: { game: Game }) {
  return <>
    <img loading="lazy" decoding="async" className="img-responsive" srcSet={imageSrcSet(`images/portfolio/${game.imgSrc}`)} sizes="(min-width: 992px) 416px, (min-width: 768px) 336px, calc(100vw - 48px)" src={`${portfolioImagesPath}${game.imgSrc}`} alt={game.altText} />
    <span className="btn btn-default">{game.title}</span>
  </>
}
