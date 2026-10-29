import { imageSrcSet } from '../../data/responsive-images'
import { useEffect, useRef } from 'react'
import Carousel from 'bootstrap/js/dist/carousel'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const slides = ['cover_horizontal.webp', 'gameplay_01.webp', 'gameplay_02.webp', 'library_hero.webp']

export default function MainGame() {
  const { t } = useTranslation()
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = carouselRef.current
    if (!element) return
    const carousel = Carousel.getOrCreateInstance(element, { interval: 3000, ride: 'carousel' })
    return () => {
      element.querySelectorAll('.carousel-item').forEach(item => item.dispatchEvent(new Event('transitionend')))
      carousel.dispose()
    }
  }, [])
  return <section id="main-game"><div className="fullscreen landing row">
    <div id="mainGameDescription" className="col-12 col-lg-6 px-3 px-md-5 py-4 d-flex flex-column justify-content-between align-items-center">
      <h2>{t('mainGame.title')}</h2>
      <p dangerouslySetInnerHTML={{ __html: t('mainGame.description') }} />
      <Link className="btn btn-light fw-bold mb-4" to="/juegos/don-pepe-y-sus-globos">{t('mainGame.details')}</Link>
      <iframe title="Don Pepe y sus globos en Steam" src="https://store.steampowered.com/widget/4079810/" width="646" height="190" loading="lazy" />
    </div>
    <div id="mainGameCarousel" className="col-12 col-lg-6 align-items-center d-flex px-0">
      <div ref={carouselRef} id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-inner">{slides.map((slide, index) => <div className={`carousel-item${index === 0 ? ' active' : ''}`} key={slide}><img loading={index === 0 ? 'eager' : 'lazy'} fetchpriority={index === 0 ? 'high' : 'auto'} decoding="async" srcSet={imageSrcSet(`images/main-game/${slide}`)} sizes="(min-width: 992px) 50vw, 100vw" src={`./images/main-game/${slide}`} className="d-block w-100" alt="" /></div>)}</div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev"><span className="carousel-control-prev-icon" /><span className="visually-hidden">{t('carousel.previous')}</span></button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next"><span className="carousel-control-next-icon" /><span className="visually-hidden">{t('carousel.next')}</span></button>
      </div>
    </div>
  </div></section>
}
