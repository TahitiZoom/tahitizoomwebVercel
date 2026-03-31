'use client'
import { useState } from 'react'
import Link from 'next/link'

const services = [
  {
    n: '01',
    t: 'Photographie',
    d: 'Reportages documentaires, portraits, événements culturels en Polynésie française.',
    img: '/images/service-photo.jpg',
  },
  {
    n: '02',
    t: 'Développement',
    d: 'Applications web Next.js, APIs REST, CMS Payload sur mesure et hébergement.',
    img: '/images/service-dev.jpg',
  },
  {
    n: '03',
    t: 'Web Design',
    d: 'Interfaces élégantes, expériences utilisateur mémorables et identités digitales.',
    img: '/images/service-design.jpg',
  },
  {
    n: '04',
    t: 'Infographie',
    d: 'Identité visuelle complète, logos, affiches, supports print et communication.',
    img: '/images/service-infographie.jpg',
  },
]

export function ServicesMenu() {
  const [active, setActive] = useState<number | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY })
  }

  return (
    <div onMouseMove={handleMove} style={{ position: 'relative' }}>

      {/* Vignette flottante */}
      {active !== null && services[active].img && (
        <div style={{
          position: 'fixed',
          left: pos.x - 180,
          top: pos.y - 120,
          width: '240px',
          height: '160px',
          pointerEvents: 'none',
          zIndex: 100,
          transition: 'opacity 0.2s',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
        }}>
          <img
            src={services[active].img}
            alt={services[active].t}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      {services.map((s, i) => (
        <Link
          key={s.n}
          href="/services"
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem 0.5rem',
            borderTop: '1px solid rgba(0,0,0,0.08)',
            textDecoration: 'none',
            transition: 'background 0.2s',
            background: active === i ? 'rgba(0,0,0,0.03)' : 'transparent',
            cursor: 'pointer',
          }}>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              color: active === i ? '#111' : '#ccc',
              letterSpacing: '0.2em',
              transition: 'color 0.2s',
            }}>/{s.n}</span>
            <span style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(2rem,4vw,3.5rem)',
              fontWeight: 300,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: active === i ? '#111' : '#888',
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
  )
}
