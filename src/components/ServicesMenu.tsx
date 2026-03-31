'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'

const services = [
  {
    n: '01',
    t: 'Photographie',
    d: 'Reportages documentaires, portraits, événements culturels en Polynésie française.',
    img: '/images/service-photo.jpeg',
  },
  {
    n: '02',
    t: 'Développement',
    d: 'Applications web Next.js, APIs REST, CMS Payload sur mesure et hébergement.',
    img: '/images/service-dev.jpeg',
  },
  {
    n: '03',
    t: 'Web Design',
    d: 'Interfaces élégantes, expériences utilisateur mémorables et identités digitales.',
    img: '/images/service-design.jpeg',
  },
  {
    n: '04',
    t: 'Infographie',
    d: 'Identité visuelle complète, logos, affiches, supports print et communication.',
    img: '/images/service-infographie.jpeg',
  },
]

export function ServicesMenu() {
  const [active, setActive] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)
  const [animState, setAnimState] = useState<'in' | 'out' | 'idle'>('idle')
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMove = (e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY })
  }

  const handleEnter = (i: number) => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    setActive(i)
    setVisible(true)
    setAnimState('in')
  }

  const handleLeave = () => {
    setAnimState('out')
    hideTimer.current = setTimeout(() => {
      setVisible(false)
      setActive(null)
      setAnimState('idle')
    }, 600)
  }

  return (
    <>
      <style>{`
        @keyframes flipIn {
          0%   { transform: perspective(800px) rotateY(-80deg) scale(0.75); opacity: 0; }
          60%  { transform: perspective(800px) rotateY(8deg)   scale(1.02); opacity: 1; }
          100% { transform: perspective(800px) rotateY(0deg)   scale(1);    opacity: 1; }
        }
        @keyframes flipOut {
          0%   { transform: perspective(800px) rotateY(0deg)   scale(1);    opacity: 1; }
          100% { transform: perspective(800px) rotateY(80deg)  scale(0.75); opacity: 0; }
        }
        .anim-in  { animation: flipIn  0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
        .anim-out { animation: flipOut 0.5s cubic-bezier(0.55,0,1,0.45) forwards; }
      `}</style>

      <div onMouseMove={handleMove} style={{ position: 'relative' }}>

        {visible && active !== null && (
          <div
            className={animState === 'in' ? 'anim-in' : animState === 'out' ? 'anim-out' : ''}
            style={{
              position: 'fixed',
              left: pos.x - 140,
              top: pos.y - 100,
              width: '240px',
              height: '170px',
              pointerEvents: 'none',
              zIndex: 100,
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
              transformOrigin: 'center center',
            }}>
            <img
              src={services[active].img}
              alt={services[active].t}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: animState === 'in' ? 'scale(1)' : 'scale(1.1)',
                transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
              }}
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.5rem 0.5rem',
              borderTop: '1px solid rgba(0,0,0,0.08)',
              textDecoration: 'none',
              transition: 'background 0.3s',
              background: active === i ? 'rgba(0,0,0,0.02)' : 'transparent',
              cursor: 'pointer',
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
              maxWidth: '320px', textAlign: 'right',
              lineHeight: '1.5', transition: 'color 0.3s',
            }} className="hidden md:block">{s.d}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
