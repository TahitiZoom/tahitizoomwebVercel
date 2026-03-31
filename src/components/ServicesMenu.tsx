'use client'
import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'

const services = [
  { n: '01', t: 'Photographie',  d: 'Reportages documentaires, portraits, événements culturels en Polynésie française.', img: '/images/service-photo.jpeg' },
  { n: '02', t: 'Développement', d: 'Applications web Next.js, APIs REST, CMS Payload sur mesure et hébergement.',      img: '/images/service-dev.jpeg' },
  { n: '03', t: 'Web Design',    d: 'Interfaces élégantes, expériences utilisateur mémorables et identités digitales.',  img: '/images/service-design.jpeg' },
  { n: '04', t: 'Infographie',   d: 'Identité visuelle complète, logos, affiches, supports print et communication.',     img: '/images/service-infographie.jpeg' },
]

export function ServicesMenu() {
  const [active, setActive]         = useState<number | null>(null)
  const [imgKey, setImgKey]         = useState(0)
  const [imgSrc, setImgSrc]         = useState('')
  const [imgVisible, setImgVisible] = useState(false)
  const [pos, setPos]               = useState({ x: 0, y: 0 })
  const hideTimer                   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevIndex                   = useRef<number | null>(null)

  const handleMove = (e: React.MouseEvent) => setPos({ x: e.clientX, y: e.clientY })

  const handleEnter = useCallback((i: number) => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    setActive(i)

    if (prevIndex.current !== i) {
      // Chaque changement de rubrique = nouvelle clé = nouvelle animation
      setImgSrc(services[i].img)
      setImgKey(k => k + 1)
      setImgVisible(true)
    }
    prevIndex.current = i
  }, [])

  const handleLeave = useCallback(() => {
    setActive(null)
    prevIndex.current = null
    hideTimer.current = setTimeout(() => setImgVisible(false), 600)
  }, [])

  return (
    <>
      <style>{`
        @keyframes tzFlipIn {
          0%   { opacity: 0; transform: perspective(1000px) rotateX(-70deg) scale(0.85); }
          50%  { opacity: 1; transform: perspective(1000px) rotateX( 10deg) scale(1.02); }
          100% { opacity: 1; transform: perspective(1000px) rotateX(  0deg) scale(1);    }
        }
        @keyframes tzFadeOut {
          0%   { opacity: 1; transform: perspective(1000px) rotateX(0deg) scale(1);    }
          100% { opacity: 0; transform: perspective(1000px) rotateX(60deg) scale(0.85); }
        }
        .tz-flip-in  { animation: tzFlipIn  1.4s cubic-bezier(0.22,1,0.36,1) both; }
        .tz-fade-out { animation: tzFadeOut 0.9s cubic-bezier(0.55,0,1,0.45) both; }
      `}</style>

      <div onMouseMove={handleMove} style={{ position: 'relative' }}>

        {imgSrc && (
          <div
            key={imgKey}
            className={imgVisible ? 'tz-flip-in' : 'tz-fade-out'}
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
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              transformOrigin: 'center bottom',
            }}>
            <img src={imgSrc} alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        {services.map((s, i) => (
          <Link key={s.n} href="/services"
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={handleLeave}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.2rem 0.5rem',
              borderTop: '1px solid rgba(0,0,0,0.08)',
              textDecoration: 'none',
              background: active === i ? 'rgba(0,0,0,0.02)' : 'transparent',
              transition: 'background 0.3s',
            }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.55rem',
                color: active === i ? '#111' : '#ccc',
                letterSpacing: '0.2em', transition: 'color 0.3s',
              }}>/{s.n}</span>
              <span style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(1.4rem,2.8vw,2.4rem)',
                fontWeight: 300, textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: active === i ? '#111' : '#aaa',
                transition: 'color 0.4s',
              }}>{s.t}</span>
            </div>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.82rem',
              color: active === i ? '#555' : '#bbb',
              maxWidth: '320px', textAlign: 'right', lineHeight: '1.6',
              transition: 'color 0.3s',
            }} className="hidden md:block">{s.d}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
