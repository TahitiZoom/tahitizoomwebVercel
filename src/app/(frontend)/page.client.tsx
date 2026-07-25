'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { EditorialCarousel } from '@/components/EditorialCarousel'
import { ClientsCarousel } from '@/components/ClientsCarousel'
import { useLocale } from '@/components/LocaleProvider'

const content = {
  fr: {
    heroTitle: ['Reporter photographe', '& créateur digital'],
    heroCta: 'Éditorial',
    universLabel: 'Univers',
    univers: [
      { title: 'Photographie',  baseline: "L'instant décisif",         img: '/images/service-photo.webp',       bg: 'var(--tz-muted-1)' },
      { title: 'Développement', baseline: 'Le code comme composition', img: '/images/service-dev.webp',         bg: 'var(--tz-muted-2)' },
      { title: 'Web Design',    baseline: "L'élégance fonctionnelle",  img: '/images/service-design.webp',      bg: 'var(--tz-muted-4)' },
      { title: 'Infographie',   baseline: "L'identité en images",      img: '/images/service-infographie.webp', bg: 'var(--tz-muted-3)' },
    ],
    discover: 'Découvrir',
    expertisesLabel: 'Expertises',
    expertises: [
      { title: 'Reportage & documentaire', desc: "Le Fenua tel qu'il vit : marchés à l'aube, Heiva, artisans à l'œuvre, visages que l'histoire ne retient jamais.", img: '/images/service-photo.webp', href: '/editorial' },
      { title: 'Portrait & événementiel', desc: 'Portraits en studio ou en extérieur, mariages, cérémonies et événements culturels en Polynésie française.', img: '/images/contact-hero.webp', href: '/services' },
      { title: 'Applications métiers', desc: 'Sites et applications web sur mesure, Next.js et Payload CMS, de l’architecture technique à l’interface.', img: '/images/service-dev.webp', href: '/services' },
    ],
    editorialLabel: 'Éditorial',
    editorialCta: "Voir tous les reportages",
    agencyLabel: 'Agence',
    agencyText: "Tahiti Zoom, c'est un œil et du code : plus de trente ans de photographie documentaire en Polynésie française, et la même exigence portée aux expériences web, de l'architecture technique à l'interface.",
    agencyCta: "Découvrir l'agence",
    devisCta: 'Demander un devis',
  },
  en: {
    heroTitle: ['Photojournalist', '& digital creator'],
    heroCta: 'Editorial',
    universLabel: 'Universe',
    univers: [
      { title: 'Photography',  baseline: 'The decisive moment',    img: '/images/service-photo.webp',       bg: 'var(--tz-muted-1)' },
      { title: 'Development',  baseline: 'Code as composition',    img: '/images/service-dev.webp',         bg: 'var(--tz-muted-2)' },
      { title: 'Web Design',   baseline: 'Functional elegance',    img: '/images/service-design.webp',      bg: 'var(--tz-muted-4)' },
      { title: 'Infographics', baseline: 'Identity in pictures',   img: '/images/service-infographie.webp', bg: 'var(--tz-muted-3)' },
    ],
    discover: 'Discover',
    expertisesLabel: 'Expertise',
    expertises: [
      { title: 'Reportage & documentary', desc: 'The Fenua as it lives: dawn markets, Heiva, artisans at work, faces history never keeps.', img: '/images/service-photo.webp', href: '/editorial' },
      { title: 'Portrait & events', desc: 'Studio or outdoor portraits, weddings, ceremonies and cultural events in French Polynesia.', img: '/images/contact-hero.webp', href: '/services' },
      { title: 'Business applications', desc: 'Custom websites and web apps, Next.js and Payload CMS, from technical architecture to interface.', img: '/images/service-dev.webp', href: '/services' },
    ],
    editorialLabel: 'Editorial',
    editorialCta: 'See all stories',
    agencyLabel: 'Agency',
    agencyText: 'Tahiti Zoom is an eye and code: over thirty years of documentary photography in French Polynesia, and the same rigor brought to web experiences, from technical architecture to interface.',
    agencyCta: 'Discover the agency',
    devisCta: 'Request a quote',
  },
}

function HeroSlideshow({ posts }: { posts: any[] }) {
  const [index, setIndex] = useState(0)
  const images = posts
    .map((p) =>
      p.coverImage?.sizes?.large?.url ||
      p.coverImage?.sizes?.medium?.url ||
      p.coverImage?.url || null)
    .filter(Boolean)
    .slice(0, 5)

  useEffect(() => {
    if (images.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000)
    return () => clearInterval(id)
  }, [images.length])

  if (images.length === 0) return null
  return (
    <>
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} src={src} alt="" aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: i === index ? 1 : 0,
            transform: i === index ? 'scale(1.04)' : 'scale(1)',
            transition: 'opacity 1.6s ease, transform 6s linear',
          }} />
      ))}
    </>
  )
}

export default function HomePageClient({ posts }: { posts: any[] }) {
  const { locale } = useLocale()
  const c = content[locale] || content.fr

  return (
    <div style={{ background: 'var(--tz-bg)', color: 'var(--tz-paper)' }}>

      {/* ── Hero plein écran, fondu de photographies ─────────────── */}
      <section style={{ position: 'relative', height: '100svh', minHeight: '560px', overflow: 'hidden' }}>
        <HeroSlideshow posts={posts} />
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(44,41,38,0.75) 0%, rgba(44,41,38,0.15) 45%, rgba(44,41,38,0.35) 100%)' }} />
        <div className="tz-grid-overlay" />

        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: '0 2rem 3rem', maxWidth: '1500px', margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          flexWrap: 'wrap', gap: '2rem', zIndex: 3 }}>
          <h1 style={{
            fontFamily: 'var(--font-linka)',
            fontWeight: 200,
            fontSize: 'clamp(2.6rem,7vw,5.8rem)',
            lineHeight: 1.06,
            letterSpacing: '0.01em',
            color: 'var(--tz-paper)',
            margin: 0,
          }}>
            {c.heroTitle[0]}<br />{c.heroTitle[1]}
          </h1>
          <Link href="/editorial" className="tz-discover" style={{ fontSize: '1.05rem', marginBottom: '0.6rem' }}>
            {c.heroCta}
          </Link>
        </div>
      </section>

      {/* ── Univers : slider horizontal de cartes ────────────────── */}
      <section style={{ padding: '7rem 0 6rem' }}>
        <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '0 2rem' }}>
          <p className="tz-chip" style={{ marginBottom: '3rem' }}>{c.universLabel}</p>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', padding: '0 2rem 1.5rem',
          scrollSnapType: 'x mandatory' }}>
          {c.univers.map((u) => (
            <Link key={u.title} href="/services"
              style={{ flexShrink: 0, scrollSnapAlign: 'start', width: 'min(420px, 82vw)',
                background: u.bg, color: 'var(--tz-bg)', textDecoration: 'none',
                display: 'flex', flexDirection: 'column' }}>
              <div style={{ overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={u.img} alt={u.title}
                  style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                  className="hover:scale-105" />
              </div>
              <div style={{ padding: '1.6rem 1.6rem 1.8rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                  color: 'rgba(44,41,38,0.75)', margin: 0 }}>{u.baseline}</p>
                <h2 style={{ fontFamily: 'var(--font-linka)', fontWeight: 300,
                  fontSize: 'clamp(1.6rem,2.6vw,2.2rem)', lineHeight: 1.1, margin: 0 }}>
                  {u.title}
                </h2>
                <span className="tz-discover" style={{ color: 'var(--tz-bg)', marginTop: '0.4rem' }}>
                  {c.discover}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Expertises : trois blocs à vignettes ─────────────────── */}
      <section style={{ padding: '5rem 2rem 6rem', borderTop: '1px solid var(--tz-line)' }}>
        <div style={{ maxWidth: '1500px', margin: '0 auto' }}>
          <p className="tz-chip" style={{ marginBottom: '3.5rem' }}>{c.expertisesLabel}</p>
          <div style={{ display: 'grid', gap: '3.5rem' }}>
            {c.expertises.map((e, i) => (
              <Link key={e.title} href={e.href}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '2.5rem', alignItems: 'center', textDecoration: 'none',
                  borderTop: '1px solid var(--tz-line)', paddingTop: '2.5rem' }}>
                <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-linka)', fontWeight: 200,
                    fontSize: 'clamp(1.9rem,4vw,3.2rem)', lineHeight: 1.1,
                    color: 'var(--tz-paper)', marginBottom: '1.2rem' }}>
                    {e.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem',
                    color: 'var(--tz-paper-dim)', lineHeight: 1.7, maxWidth: '480px',
                    marginBottom: '1.4rem' }}>
                    {e.desc}
                  </p>
                  <span className="tz-discover">{c.discover}</span>
                </div>
                <div style={{ overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={e.img} alt={e.title}
                    style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', display: 'block' }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Éditorial : bande de reportages ──────────────────────── */}
      {posts.length > 0 && (
        <section style={{ padding: '5rem 0 6rem', borderTop: '1px solid var(--tz-line)' }}>
          <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '0 2rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <p className="tz-chip">{c.editorialLabel}</p>
            <Link href="/editorial" className="tz-discover">{c.editorialCta}</Link>
          </div>
          <EditorialCarousel posts={posts} />
        </section>
      )}

      {/* ── Agence ───────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 2rem 7rem', borderTop: '1px solid var(--tz-line)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p className="tz-chip" style={{ marginBottom: '2.5rem' }}>{c.agencyLabel}</p>
          <p style={{ fontFamily: 'var(--font-linka)', fontWeight: 200,
            fontSize: 'clamp(1.4rem,2.8vw,2.1rem)', lineHeight: 1.45,
            color: 'var(--tz-paper)', marginBottom: '3rem' }}>
            {c.agencyText}
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/a-propos" className="tz-btn">{c.agencyCta}</Link>
            <Link href="/contact" className="tz-discover">{c.devisCta}</Link>
          </div>
        </div>
      </section>

      <ClientsCarousel />
    </div>
  )
}
