import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import './GameGallery.css'
import { Carousel } from 'bootstrap'
import { FaChevronLeft, FaChevronRight, FaExpand, FaCompress } from 'react-icons/fa6'

interface GameGalleryProps {
  images: string[]
  imagePath: string
  title: string
}

export default function GameGallery({ images, imagePath, title }: GameGalleryProps) {
  const { t } = useTranslation()
  const carouselId = 'gallery-' + useId().replace(/:/g, '')
  const carouselRef = useRef<HTMLDivElement>(null)
  const carouselInstance = useRef<Carousel | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const alt = t('gamePage.screenshotAlt', { title, number: activeIndex + 1 })

  useEffect(() => {
    const element = carouselRef.current
    if (!element) return
    const instance = Carousel.getOrCreateInstance(element, { interval: false, ride: false })
    carouselInstance.current = instance
    const onSlide = (event: Event) => setActiveIndex((event as Event & { to: number }).to)
    element.addEventListener('slid.bs.carousel', onSlide)
    return () => {
      element.removeEventListener('slid.bs.carousel', onSlide)
      // Complete any pending Bootstrap transition before disposing its instance.
      element.querySelectorAll('.carousel-item').forEach(item => item.dispatchEvent(new Event('transitionend')))
      instance.dispose()
      carouselInstance.current = null
    }
  }, [])

  useEffect(() => {
    if (!expanded) return
    const dialog = dialogRef.current
    if (!dialog) return
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [expanded])

  if (!images.length) return null

  const close = () => {
    dialogRef.current?.close()
    setExpanded(false)
    carouselRef.current?.querySelector<HTMLButtonElement>('.carousel-item.active button')?.focus({ preventScroll: true })
  }

  const handleLightboxKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    if (event.key === 'ArrowLeft') carouselInstance.current?.prev()
    else carouselInstance.current?.next()
  }

  return <section className="game-detail-gallery" aria-labelledby="gallery-title">
    <div className="container">
      <h2 id="gallery-title">{t('gamePage.gallery')}</h2>
      <div
        id={carouselId}
        ref={carouselRef}
        className="carousel slide game-gallery-carousel"
        role="group"
        aria-label={t('gamePage.gallery')}
        data-bs-interval="false"
      >
        <div className="carousel-inner">
          {images.map((image, index) => <div className={`carousel-item${index === 0 ? ' active' : ''}`} key={image + index}>
            <button
              className="game-gallery-image"
              type="button"
              aria-label={t('gamePage.openImage', { number: index + 1 })}
              aria-haspopup="dialog"
              onClick={() => { setActiveIndex(index); setExpanded(true) }}
            >
              <img src={imagePath + image} alt={t('gamePage.screenshotAlt', { title, number: index + 1 })} loading="lazy" />
              <span className="game-gallery-expand" title={t('gamePage.enlarge')} aria-hidden="true"><FaExpand /></span>
            </button>
          </div>)}
        </div>
        {images.length > 1 && <>
          <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">{t('carousel.previous')}</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">{t('carousel.next')}</span>
          </button>
        </>}
        <span className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">{activeIndex + 1} / {images.length}</span>
        {images.length > 1 && <div className="carousel-indicators" role="group" aria-label={t('gamePage.chooseImage')}>
          {images.map((image, index) => <button
            key={image + index}
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : undefined}
            aria-label={t('gamePage.screenshotAlt', { title, number: index + 1 })}
            aria-current={index === 0 ? 'true' : undefined}
          />)}
        </div>}
      </div>
      <dialog
        ref={dialogRef}
        className="game-gallery-lightbox"
        aria-label={t('gamePage.gallery') + ': ' + title}
        onKeyDown={handleLightboxKeyDown}
        onCancel={(event) => { event.preventDefault(); close() }}
        onClick={(event) => { if (event.target instanceof Element && !event.target.closest('img, button')) close() }}
      >
        {expanded && <div className="game-gallery-lightbox-content">
          <div className="game-gallery-lightbox-header">
            <span>{alt}</span>
            <button className="btn btn-outline-light" type="button" autoFocus onClick={close}>{t('common.close')} <FaCompress /></button>
          </div>
          <img src={imagePath + images[activeIndex]} alt={alt} />
          <div className="d-flex align-items-center justify-content-center gap-3 mt-3">
            <button className="btn btn-outline-light" type="button" disabled={images.length < 2} onClick={() => carouselInstance.current?.prev()}><FaChevronLeft /> {t('carousel.previous')}</button>
            <span role="status" aria-live="polite" aria-atomic="true">{activeIndex + 1} / {images.length}</span>
            <button className="btn btn-outline-light" type="button" disabled={images.length < 2} onClick={() => carouselInstance.current?.next()}>{t('carousel.next')} <FaChevronRight /></button>
          </div>
        </div>}
      </dialog>
    </div>
  </section>
}
