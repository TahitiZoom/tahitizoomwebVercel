'use client'
import { useState } from 'react'
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
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [flipped, setFlipped] = useState(false)

  const handleMove = (e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY })
  }

  const handleEnter = (i: number) => {
    setActive(i)
    setFlipped(false)
    setTimeout(() => setFlipped(true), 50)
  }

  const handleLeave = () => {
    setFlipped(false)
    setTimeout(() => setActive(null), 300)
  }

  return (
    <>
      {/* Style keyframes */}
      <style>{`
        @keyframes flipIn {
          0%   { transform: perspective(600px) rotateY(-90deg) scale(0.8); opacity: 0; }
          100% { transform: perspective(600px) rotateY(0deg)  scale(1);   opacity: 1; }
        }
        @keyframes flipOut {
          0%   { transform: perspective(600px) rotateY(0deg)  scale(1);   opacity: 1; }
          100% { transform: perspective(600px) rotateY(90deg) scale(0.8); opacity: 0; }
        }
        .flip-in  { animation: flipIn  0.35s cubic-bezier(0.22,1,0.36,1) forwards; }
        .flip-out { animation: flipOut 0.25s cubic-bezier(0.55,0,1,0.45) forwards; }
      `}</style>

      <div onMouseMove={handleMove} style={{ position: 'relative' }}>

        {/* Vignette flottante avec flip */}
        {active !== null && (
          <div
            className={flipped ? 'flip-in' : 'flip-out'}
            style={{
              position: 'fixed',
              left: pos.x - 140,
              top: pos.y - 100,
              width: '220px',
              height: '160px',
              pointerEvents: 'none',
              zIndex: 100,
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
              transformOrigin: 'center center',
            }}>
            <img
              src={services[active].img}
              alt={services[active].t}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: flipped ? 'scale(1)' : 'scale(1.15)',
                transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
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
              transition: 'background 0.2s',
              background: active === i ? 'rgba(0,0,0,0.02)' : 'transparent',
              cursor: 'pointer',
            }}>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                color: active === i ? '#111' : '#ccc',
                letterSpacing: '0.2em',
                transition: 'color 0.3s',
              }}>/{s.n}</span>
              <span style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(2rem,4vw,3.5rem)',
                fontWeight: 300,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: active === i ? '#111' : '#aaa',
                transition: 'color 0.3s',
              }}>{s.t}</span>
            </div>

            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: active === i ? '#555' : '#bbb',
              maxWidth: '320px',
              textAlign: 'right',
              lineHeight: '1.5',
              transition: 'color 0.3s',
            }} className="hidden md:block">{s.d}</span>

          </Link>
        ))}
      </div>
    </>
  )
}
