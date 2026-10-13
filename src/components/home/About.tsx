import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()
  return <section id="about"><div className="container"><div className="row white">
    <h2 className="centered">{t('about.title')}</h2><hr />
    <div className="col-md-6" id="imgContainer"><img loading="lazy" decoding="async" className="img-responsive" src="./images/about/ibis.png" alt="Ibis Interactive" /></div>
    <div className="col-md-6"><h3>{t('about.subtitle')}</h3><p dangerouslySetInnerHTML={{ __html: t('about.description') }} />
      <div id="iframe-youtube"><iframe src="https://www.youtube-nocookie.com/embed/aYWqpqKQbjc?si=5afDFsHkPvfCvt_G" title={t('about.video')} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy" /></div>
    </div>
  </div></div></section>
}
