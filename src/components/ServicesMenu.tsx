'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocale } from './LocaleProvider'

/* Visuels servant de fond au bloc Expertise */
const backdrops = [
  '/images/service-photo.webp',
  '/images/service-dev.webp',
  '/images/service-design.webp',
  '/images/service-infographie.webp',
]

const expertisesData = {
  fr: {
    heading: '3 expertises pour immortaliser, raconter, développer',
    items: [
      { n: '01', t: 'Photographie',  href: '/services#photographie',  d: 'Reportages documentaires, portraits et événements culturels en Polynésie française.' },
      { n: '02', t: 'Développement', href: '/services#developpement', d: 'Applications web Next.js, APIs REST, CMS Payload sur mesure et hébergement.' },
      { n: '03', t: 'Brand content', href: '/services#brand-content', d: 'Identité visuelle, web design, supports print et contenus de marque.' },
    ],
  },
  en: {
    heading: '3 areas of expertise to capture, tell, build',
    items: [
      { n: '01', t: 'Photography',   href: '/services#photographie',  d: 'Documentary reports, portraits and cultural events in French Polynesia.' },
      { n: '02', t: 'Development',   href: '/services#developpement', d: 'Next.js web apps, REST APIs, custom Payload CMS and hosting.' },
      { n: '03', t: 'Brand content', href: '/services#brand-content', d: 'Visual identity, web design, print materials and brand content.' },
    ],
  },
}

export function ServicesMenu() {
  const { locale } = useLocale()
  const data = expertisesData[locale] || expertisesData.fr
  const [active, setActive] = useState<number | null>(null)
  const [slide, setSlide] = useState(0)

  /* Diaporama de fond, effet Ken Burns à chaque changement */
  useEffect(() => {
    const id = setInterval(() => setSlide((i) => (i + 1) % backdrops.length), 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="services" style={{ position: 'relative', overflow: 'hidden', minHeight: '150vh',
      display: 'flex', alignItems: 'center' }}>
      {/* Fond photographique plein écran */}
      {backdrops.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} src={src} alt="" aria-hidden="true"
          className={i === slide ? 'tz-kb tz-kb--on' : 'tz-kb'} />
      ))}
      <div style={{ position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.48) 50%, rgba(0,0,0,0.68) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 2, width: '100%',
        maxWidth: '1400px', margin: '0 auto', padding: '8rem 2rem' }}>
        <h2 style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: 'clamp(2rem,5vw,4rem)',
          fontWeight: 300,
          lineHeight: 1.15,
          color: 'white',
          maxWidth: '900px',
          marginBottom: '6rem',
        }}>
          {data.heading}
        </h2>

        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.25)' }}>
          {data.items.map((s, i) => (
            <Link key={s.n} href={s.href}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: '2rem',
                padding: '3rem 0.5rem',
                borderTop: '1px solid rgba(255,255,255,0.25)',
                textDecoration: 'none',
                transition: 'padding-left 0.35s ease',
                paddingLeft: active === i ? '1.5rem' : '0.5rem',
              }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.8rem' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem',
                  color: active === i ? 'white' : 'rgba(255,255,255,0.55)', letterSpacing: '0.2em',
                  transition: 'color 0.3s' }}>({s.n})</span>
                <span style={{ fontFamily: 'Manrope, sans-serif',
                  fontSize: 'clamp(2rem,5vw,4.2rem)', fontWeight: 300,
                  textTransform: 'uppercase', letterSpacing: '0.03em',
                  color: active === i ? 'white' : 'rgba(255,255,255,0.8)',
                  transition: 'color 0.4s' }}>
                  {s.t}
                </span>
              </div>

              <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem',
                color: active === i ? 'white' : 'rgba(255,255,255,0.7)', maxWidth: '360px',
                textAlign: 'right', lineHeight: '1.6', transition: 'color 0.3s' }}
                className="hidden md:block">{s.d}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
