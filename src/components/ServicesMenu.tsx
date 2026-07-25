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

export function ServicesMenu() {
  const { locale } = useLocale()
  const services = servicesData[locale] || servicesData.fr
  const [active, setActive] = useState<number | null>(null)
  const [pos, setPos]       = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => setPos({ x: e.clientX, y: e.clientY })

  return (
    <div onMouseMove={handleMove} style={{ position: 'relative', borderBottom: '1px solid var(--tz-line)' }}>
      {services.map((s, i) => (
        <Link key={s.n} href="/services"
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1.6rem 0.5rem',
            borderTop: '1px solid var(--tz-line)',
            textDecoration: 'none',
            transition: 'padding 0.3s',
            paddingLeft: active === i ? '1.5rem' : '0.5rem',
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
              transform: active === i ? 'rotate(3deg) scale(1)' : 'rotate(-3deg) scale(0.9)',
              opacity: active === i ? 1 : 0,
              transition: 'opacity 0.2s, transform 0.3s',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.8rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem',
              color: active === i ? 'var(--tz-accent)' : 'var(--tz-paper-faint)',
              letterSpacing: '0.2em', transition: 'color 0.3s' }}>({s.n})</span>
            <span style={{ fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(1.6rem,3.2vw,2.8rem)', fontWeight: 300,
              textTransform: 'uppercase', letterSpacing: '0.03em',
              color: active === i ? 'var(--tz-paper)' : 'var(--tz-paper-dim)',
              transition: 'color 0.4s' }}>
              {s.t}
            </span>
          </div>

          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem',
            color: active === i ? 'var(--tz-paper-dim)' : 'var(--tz-paper-faint)', maxWidth: '320px',
            textAlign: 'right', lineHeight: '1.6', transition: 'color 0.3s' }}
            className="hidden md:block">{s.d}</span>

        </Link>
      ))}
    </div>
  )
}
