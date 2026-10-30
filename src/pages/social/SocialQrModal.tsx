import { useEffect, useId, useRef } from 'react'
import type { SocialCopy } from './content'
import './SocialQrModal.css'

interface SocialQrModalProps {
  text: SocialCopy['qr']
  notice: string
  onCopy: () => Promise<void>
  onClose: () => void
}

export default function SocialQrModal({ text, notice, onCopy, onClose }: SocialQrModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const body = document.body
    const root = document.documentElement
    const rootOverflow = root.style.overflow
    const preventTouchScroll = (event: TouchEvent) => {
      if (event.touches.length === 1) event.preventDefault()
    }
    const scrollY = window.scrollY
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    }
    Object.assign(body.style, {
      position: 'fixed',
      top: `-${scrollY}px`,
      width: '100%',
      overflow: 'hidden',
    })
    root.style.overflow = 'hidden'
    document.addEventListener('touchmove', preventTouchScroll, { passive: false })
    dialog.showModal()
    return () => {
      dialog.close()
      document.removeEventListener('touchmove', preventTouchScroll)
      root.style.overflow = rootOverflow
      Object.assign(body.style, previous)
      window.scrollTo({ top: scrollY, behavior: 'instant' })
    }
  }, [])

  return <dialog
    ref={dialogRef}
    className="social-qr-modal"
    aria-labelledby={titleId}
    onCancel={(event) => { event.preventDefault(); onClose() }}
    onClick={(event) => {
      if (event.target instanceof Element && !event.target.closest('img, button')) onClose()
    }}
  >
    <h2 id={titleId} className="visually-hidden">{text.title}</h2>
    <img className="social-qr-image" src="/images/social.svg" alt={text.alt} width={256} height={256} />
    {/* <div className="social-qr-actions">
      <button type="button" onClick={() => void onCopy()}>{text.copy}</button>
      <button type="button" autoFocus onClick={onClose}>{text.close}</button>
    </div> */}
    <p className="social-qr-notice" role="status" aria-atomic="true">{notice}</p>
  </dialog>
}
