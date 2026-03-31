'use client'
import { useState, useRef } from 'react'
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
  const [phase, setPhase]         = useState<'idle'|'enter'|'flip-out'|'flip-in'|'exit'>('idle')
  const [pos, setPos]             = useState({ x: 0, y: 0 })
  const prevActive                = useRef<number | null>(null)
  const timer                     = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMove = (e: React.MouseEvent) => setPos({ x: e.clientX, y: e.clientY })

  const handleEnter = (i: number) => {
    if (timer.current) clearTimeout(timer.current)

    if (prevActive.current === null) {
      setDisplayed(i)
      setPhase('enter')
    } else if (prevActive.current !== i) {
      setPhase('flip-out')
      timer.current = setTimeout(() => {
        setDisplayed(i)
        setPhase('flip-in')
      }, 400)
    }

    setActive(i)
    prevActive.current = i
  }

  const handleLeave = () => {
    setActive(null)
    prevActive.current = null
    setPhase('exit')
    timer.current = setTimeout(() => {
      setDisplayed(null)
      setPhase('idle')
    }, 500)
  }

  const thumbStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
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
      transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease',
    }
    switch (phase) {
      case 'enter':    return { ...base, transform: 'perspective(900px) rotateX(0deg) scale(1)',    opacity: 1 }
      case 'flip-out': return { ...base, transform: 'perspective(900px) rotateX(90deg) scale(0.8)', opacity: 0 }
      case 'flip-in':  return { ...base, transform: 'perspective(900px) rotateX(0deg) scale(1)',    opacity: 1 }
      case 'exit':     return { ...base, transform: 'perspective(900px) rotateX(0deg) scale(0.9)',  opacity: 0 }
      default:         return { ...base, transform: 'perspective(900px) rotateX(90deg) scale(0.8)', opacity: 0 }
    }
  }

  return (
    <div onMouseMove={handleMove} style={{ position: 'relative' }}>

      {displayed !== null && (
        <div style={thumbStyle()}>
          <img
            src={services[displayed].img}
            alt={services[displayed].t}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: phase === 'flip-out' ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
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
  )
}
