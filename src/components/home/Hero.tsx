import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()
  return <section id="home-section"><div id="headerwrap">
    <header className="clearfix tb"><div className="tb-cell text-center">
      <img loading="lazy" decoding="async" id="logo" src="./images/logos/png/logo_base.png" alt="Ibis Interactive" />
      <h1>Ibis Interactive</h1>
      <a href="#portfolio" className="btn btn-lg fw-semibold">{t('home.portfolio')}</a>
    </div></header>
  </div></section>
}
