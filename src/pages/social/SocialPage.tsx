import { useEffect, useRef, useState } from 'react'
import { VscShare } from 'react-icons/vsc'
import { IoArrowBack } from 'react-icons/io5'
import { LuQrCode } from 'react-icons/lu'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Classic from './Classic'
import SocialQrModal from './SocialQrModal'
import { copy } from './content'
import './social.css'

export default function SocialPage() {
  const { i18n } = useTranslation()
  const [notice, setNotice] = useState('')
  const [qrOpen, setQrOpen] = useState(false)
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(noticeTimer.current), [])
  function showNotice(message: string) {
    clearTimeout(noticeTimer.current)
    setNotice(message)
    noticeTimer.current = setTimeout(() => setNotice(''), 4000)
  }
  const qrButton = useRef<HTMLButtonElement>(null)
  const language = i18n.language.startsWith('en') ? 'en' : 'es'
  const text = copy[language]
  async function share() {
    try {
      await navigator.clipboard.writeText(new URL('/social', window.location.origin).href)
      showNotice(text.copied)
    } catch { showNotice(text.failed) }
  }
  function closeQr() {
    setQrOpen(false)
    qrButton.current?.focus({ preventScroll: true })
  }
  return <main className="social-page">
    <div className="social-toolbar"><Link id='back-link' to="/" aria-label={text.back}><IoArrowBack /></Link><div>
      <button type="button" aria-label={text.language} onClick={() => void i18n.changeLanguage(language === 'es' ? 'en' : 'es')}>{language === 'es' ? 'EN' : 'ES'}</button>
      <button type="button" id="copy-button" aria-label={text.share} onClick={() => void share()}><VscShare /></button>
      <button ref={qrButton} type="button" id="qr-button" aria-label={text.qr.open} aria-haspopup="dialog" onClick={() => { setNotice(''); setQrOpen(true) }}><LuQrCode /></button>
    </div></div>
    {notice && !qrOpen && <p className="social-toast" role="status" aria-atomic="true">{notice}</p>}
    <Classic text={text} />
    <footer className="social-end"><a href="/">ibisinteractive.cl</a><span>Ibis Interactive</span></footer>
    {qrOpen && <SocialQrModal text={text.qr} notice={notice} onCopy={share} onClose={closeQr} />}
  </main>
}
