'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from './LocaleProvider'

const servicesData = {
  fr: [
    { n: '01', t: 'Photographie',  d: 'Reportages documentaires, portraits, événements culturels en Polynésie française.', img: '/images/service-photo.webp' },
    { n: '02', t: 'Développement', d: 'Applications web Next.js, APIs REST, CMS Payload sur mesure et hébergement.',      img: '/images/service-dev.webp' },
    { n: '03', t: 'Web Design',    d: 'Interfaces élégantes, expériences utilisateur mémorables et identités digitales.',  img: '/images/service-design.webp' },
    { n: '04', t: 'Infographie',   d: 'Identité visuelle complète, logos, affiches, supports print et communication.',     img: '/images/service-infographie.webp' },
  ],
  en: [
    { n: '01', t: 'Photography',   d: 'Documentary reports, portraits, cultural events in French Polynesia.',             img: '/images/service-photo.webp' },
    { n: '02', t: 'Development',   d: 'Next.js web apps, REST APIs, custom Payload CMS and hosting.',                     img: '/images/service-dev.webp' },
    { n: '03', t: 'Web Design',    d: 'Elegant interfaces, memorable user experiences and digital identities.',           img: '/images/service-design.webp' },
    { n: '04', t: 'Infographics',  d: 'Complete visual identity, logos, posters, print and communication materials.',     img: '/images/service-infographie.webp' },
  ],
}

const accents = [
  { soft: 'var(--tz-coral-soft)',      deep: 'var(--tz-coral-deep)' },
  { soft: 'var(--tz-lagoon-soft)',     deep: 'var(--tz-lagoon-deep)' },
  { soft: 'var(--tz-lilac-soft)',      deep: 'var(--tz-lilac-deep)' },
  { soft: 'var(--tz-frangipani-soft)', deep: 'var(--tz-frangipani-deep)' },
]

export function ServicesMenu() {
  const { locale } = useLocale()
  const services = servicesData[locale] || servicesData.fr
  const [active, setActive] = useState<number | null>(null)
  const [pos, setPos]       = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => setPos({ x: e.clientX, y: e.clientY })

  return (
    <div onMouseMove={handleMove} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      {services.map((s, i) => (
        <Link key={s.n} href="/services"
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1.2rem 1.5rem',
            borderRadius: '1.25rem',
            textDecoration: 'none',
            background: active === i ? accents[i].soft : 'var(--tz-cream)',
            transition: 'background 0.3s, transform 0.3s',
            transform: active === i ? 'translateX(6px)' : 'none',
            position: 'relative',
          }}>

          <img src={s.img} alt={s.t}
            style={{
              position: 'fixed',
              left: pos.x - 100,
              top: pos.y - 120,
              width: '200px',
              height: '240px',
              objectFit: 'cover',
              pointerEvents: 'none',
              zIndex: 100,
              borderRadius: '1rem',
              transform: active === i ? 'rotateX(360deg)' : 'rotateX(270deg)',
              opacity: active === i ? 1 : 0,
              transition: '0.15s',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem',
              color: accents[i].deep, letterSpacing: '0.2em', fontWeight: 600,
              transition: 'color 0.3s' }}>/{s.n}</span>
            <span style={{ fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem,3vw,2.6rem)', fontWeight: 400,
              textTransform: 'uppercase', letterSpacing: '0.04em',
              color: active === i ? accents[i].deep : 'var(--tz-ink)', transition: 'color 0.4s' }}>
              {s.t}
            </span>
          </div>

          <span style={{ fontFamily: 'var(--font-body)', fontSize: '1rem',
            color: active === i ? 'var(--tz-ink-soft)' : '#a8b2b0', maxWidth: '320px',
            textAlign: 'right', lineHeight: '1.6', transition: 'color 0.3s' }}
            className="hidden md:block">{s.d}</span>

        </Link>
      ))}
    </div>
  )
}
