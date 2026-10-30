import { useLayoutEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './not-found.css'



export default function NotFoundPage() {
  const { pathname } = useLocation()
  const { t } = useTranslation()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return <div className="not-found">
    <header className="not-found-header">
      <Link className="not-found-brand" to="/">Ibis Interactive</Link>
    </header>
    <main className="not-found-stage">
      <div className="not-found-art">
        <span className="not-found-code">404</span>
        <img src={`${import.meta.env.BASE_URL}images/network-fail.png`} alt="" width="1500" height="1422" />
      </div>
      <div className="not-found-copy">
        <h1>{t('notFound.title')}</h1>
        <p>{t('notFound.text')}</p>
        <div className="not-found-actions">
          <Link className="not-found-primary" to="/">{t('notFound.home')}</Link>
        </div>
      </div>
    </main>
    <footer className="not-found-footer">{t('notFound.footer')}</footer>
  </div>
}