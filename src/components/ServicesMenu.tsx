'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const services = [
  { n: '01', t: 'Photographie',  d: 'Reportages documentaires, portraits, événements culturels en Polynésie française.', img: '/images/service-photo.jpeg' },
  { n: '02', t: 'Développement', d: 'Applications web Next.js, APIs REST, CMS Payload sur mesure et hébergement.',      img: '/images/service-dev.jpeg' },
  { n: '03', t: 'Web Design',    d: 'Interfaces élégantes, expériences utilisateur mémorables et identités digitales.',  img: '/images/service-design.jpeg' },
  { n: '04', t: 'Infographie',   d: 'Identité visuelle complète, logos, affiches, supports print et communication.',     img: '/images/service-infographie.jpeg' },
]

export function ServicesMenu() {
  const [active, setActive]       = useState<number | null>(null)
  const [displayed, setDisplayed] = useState<number | null>(null)
  const [flipping, setFlipping]   = useState(false)
  const [visible, setVisible]     = useState(false)
  const [pos, setPos]             = useState({ x: 0, y: 0 })
  const prevActive                = useRef<number | null>(null)
  const flipTimer                 = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimer                 = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMove = (e: React.MouseEvent) => setPos({ x: e.clientX, y: e.clientY })

  const handleEnter = (i: number) => {
    if (hideTimer.current) clearTimeout(hideTimer.current)

    if (prevActive.current === null) {
      // Premier survol — apparition directe
      setDisplayed(i)
      setVisible(true)
      setFlipping(false)
    } else if (prevActive.current !== i) {
      // Passage d'un item à l'autre — flip
      setFlipping(true)
      if (flipTimer.current) clearTimeout(flipTimer.current)
      flipTimer.current = setTimeout(() => {
        setDisplayed(i)
        setFlipping(false)
      }, 600) // mi-chemin du flip
    }

    setActive(i)
    prevActive.current = i
  }

  const handleLeave = () => {
    setActive(null)
    prevActive.current = null
    hideTimer.current = setTimeout(() => {
      setVisible(false)
      setDisplayed(null)
    }, 400)
  }

  return (
    <>
      <style>{`
        @keyframes flipChange {
          0%   { transform: perspective(800px) rotateY(0deg)   scale(1);    opacity: 1; }
          40%  { transform: perspective(800px) rotateY(-90deg) scale(0.85); opacity: 0; }
          60%  { transform: perspective(800px) rotateY(90deg)  scale(0.85); opacity: 0; }
          100% { transform: perspective(800px) rotateY(0deg)   scale(1);    opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.92); }
        }
        .thumb-flip   { animation: flipChange 1.2s cubic-bezier(0.4,0,0.2,1) forwards; }
        .thumb-fadein { animation: fadeIn     0.35s cubic-bezier(0.22,1,0.36,1) forwards; }
        .thumb-fadeout{ animation: fadeOut    0.35s cubic-bezier(0.55,0,1,0.45) forwards; }
      `}</style>

      <div onMouseMove={handleMove} style={{ position: 'relative' }}>

        {displayed !== null && (
          <div
            key={displayed}
            className={
              !visible ? 'thumb-fadeout' :
              flipping  ? 'thumb-flip'   :
              'thumb-fadein'
            }
            style={{
              position: 'fixed',
              left: pos.x - 130,
              top: pos.y - 110,
              width: '240px',
              height: '170px',
              pointerEvents: 'none',
              zIndex: 100,
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
              transformOrigin: 'center center',
            }}>
            <img
              src={services[displayed].img}
              alt={services[displayed].t}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        {services.map((s, i) => (
          <Link
            key={s.n}
            href="/services"
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={handleLeave}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.5rem 0.5rem',
              borderTop: '1px solid rgba(0,0,0,0.08)',
              textDecoration: 'none',
              background: active === i ? 'rgba(0,0,0,0.02)' : 'transparent',
              transition: 'background 0.3s',
            }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.6rem',
                color: active === i ? '#111' : '#ccc',
                letterSpacing: '0.2em', transition: 'color 0.3s',
              }}>/{s.n}</span>
              <span style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(2rem,4vw,3.5rem)',
                fontWeight: 300, textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: active === i ? '#111' : '#aaa',
                transition: 'color 0.4s',
              }}>{s.t}</span>
            </div>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.9rem',
              color: active === i ? '#555' : '#bbb',
              maxWidth: '320px', textAlign: 'right', lineHeight: '1.5',
              transition: 'color 0.3s',
            }} className="hidden md:block">{s.d}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
