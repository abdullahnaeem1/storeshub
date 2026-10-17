'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  function closeModal() { setOpen(false); setSent(false) }
  function submitForm(event) { event.preventDefault(); setSent(true) }

  return <><header className="site-header"><div className="nav-shell"><Link className="brand" href="/" aria-label="StoreHub home"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>StoresHub</Link><nav><a href="#platform">Home</a><a href="#solutions">Features</a><a href="#pricing">Pricing</a><button type="button" onClick={() => setOpen(true)}>Contact</button></nav><div className="nav-actions"><a className="sign-in" href="#login">Sign in</a><a className="button small" href="#demo">Get started <b>→</b></a></div></div></header><AnimatePresence>{open && <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={closeModal}><motion.section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="contact-title" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: .98 }} transition={{ duration: .25, ease: [0.22, 1, 0.36, 1] }} onMouseDown={(event) => event.stopPropagation()}>{sent ? <div className={styles.success}><span>✓</span><p className="eyebrow">Message received</p><h2>Thanks for reaching out.</h2><p>We&apos;ll be in touch shortly.</p><button className="button" type="button" onClick={closeModal}>Close</button></div> : <><button className={styles.close} type="button" onClick={closeModal} aria-label="Close contact form">×</button><p className="eyebrow">Let&apos;s talk</p><h2 id="contact-title">How can we help?</h2><p className={styles.lead}>Tell us a little about your project and our team will get back to you.</p><form className={styles.form} onSubmit={submitForm}><div className={styles.row}><label>Full name<input name="name" autoComplete="name" required placeholder="Jane Smith" /></label><label>Work email<input name="email" type="email" autoComplete="email" required placeholder="jane@company.com" /></label></div><label>What are you interested in?<select name="interest" defaultValue="" required><option value="" disabled>Select an option</option><option>Product demo</option><option>Pricing information</option><option>Partnership</option><option>Other</option></select></label><label>How can we help?<textarea name="message" rows="4" required placeholder="Tell us about your goals..." /></label><button className={`button ${styles.submit}`} type="submit">Send message <b>→</b></button></form></>}</motion.section></motion.div>}</AnimatePresence></>
}
