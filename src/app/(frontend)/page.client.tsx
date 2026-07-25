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
    universHeading: "4 univers comme terrains d'expression de mon regard",
    universIntro: [
      "Chaque univers est un terrain d'observation à explorer avec curiosité. J'en ai appris les codes, les rythmes et les enjeux.",
      "Du marché de Papeete au back-office d'une application métier, un fil rouge les relie : l'humain.",
    ],
    univers: [
      { title: 'Photographie',  baseline: "L'instant décisif",         img: '/images/service-photo.webp',       bg: 'var(--tz-muted-1)' },
      { title: 'Développement', baseline: 'Le code comme composition', img: '/images/service-dev.webp',         bg: 'var(--tz-muted-2)' },
      { title: 'Web Design',    baseline: "L'élégance fonctionnelle",  img: '/images/service-design.webp',      bg: 'var(--tz-muted-4)' },
      { title: 'Infographie',   baseline: "L'identité en images",      img: '/images/service-infographie.webp', bg: 'var(--tz-muted-3)' },
    ],
    discover: 'Découvrir',
    expertisesLabel: 'Expertises',
    expertises: [
      { title: 'Reportage & documentaire', tagline: 'Raconter le Fenua, inspirer le regard',
        desc: "Le Fenua tel qu'il vit : marchés à l'aube, Heiva, artisans à l'œuvre, visages que l'histoire ne retient jamais.",
        img: '/images/service-photo.webp', href: '/editorial' },
      { title: 'Portrait & événementiel', tagline: "L'émotion à hauteur d'homme",
        desc: 'Portraits en studio ou en extérieur, mariages, cérémonies et événements culturels en Polynésie française.',
        img: '/images/contact-hero.webp', href: '/services' },
      { title: 'Applications métiers', tagline: 'Le code au service du récit',
        desc: "Sites et applications web sur mesure, Next.js et Payload CMS, de l'architecture technique à l'interface.",
        img: '/images/service-dev.webp', href: '/services' },
    ],
    editorialLabel: 'Éditorial',
    editorialCta: 'Voir tous les reportages',
    agencyLabel: 'Agence',
    agencyText: "Tahiti Zoom, c'est un œil et du code : plus de trente ans de photographie documentaire en Polynésie française, et la même exigence portée aux expériences web, de l'architecture technique à l'interface.",
    agencyCta: "Découvrir l'agence",
    devisCta: 'Demander un devis',
  },
  en: {
    heroTitle: ['Photojournalist', '& digital creator'],
    heroCta: 'Editorial',
    universLabel: 'Universe',
    universHeading: '4 universes as fields of expression for my eye',
    universIntro: [
      'Each universe is a field of observation to explore with curiosity. I have learned its codes, rhythms and stakes.',
      'From the Papeete market to the back office of a business application, one thread connects them: the human.',
    ],
    univers: [
      { title: 'Photography',  baseline: 'The decisive moment',  img: '/images/service-photo.webp',       bg: 'var(--tz-muted-1)' },
      { title: 'Development',  baseline: 'Code as composition',  img: '/images/service-dev.webp',         bg: 'var(--tz-muted-2)' },
      { title: 'Web Design',   baseline: 'Functional elegance',  img: '/images/service-design.webp',      bg: 'var(--tz-muted-4)' },
      { title: 'Infographics', baseline: 'Identity in pictures', img: '/images/service-infographie.webp', bg: 'var(--tz-muted-3)' },
    ],
    discover: 'Discover',
    expertisesLabel: 'Expertise',
    expertises: [
      { title: 'Reportage & documentary', tagline: 'Telling the Fenua, inspiring the eye',
        desc: 'The Fenua as it lives: dawn markets, Heiva, artisans at work, faces history never keeps.',
        img: '/images/service-photo.webp', href: '/editorial' },
      { title: 'Portrait & events', tagline: 'Emotion at human height',
        desc: 'Studio or outdoor portraits, weddings, ceremonies and cultural events in French Polynesia.',
        img: '/images/contact-hero.webp', href: '/services' },
      { title: 'Business applications', tagline: 'Code in the service of the story',
        desc: 'Custom websites and web apps, Next.js and Payload CMS, from technical architecture to interface.',
        img: '/images/service-dev.webp', href: '/services' },
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

      {/* ── Univers : intro + slider de bandes à fond sourd ──────── */}
      <section style={{ padding: '7rem 0 6rem' }}>
        <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '0 2rem',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem', alignItems: 'start', marginBottom: '4rem' }}>
          <div>
            <p className="tz-chip" style={{ marginBottom: '2rem' }}>{c.universLabel}</p>
            <h2 style={{ fontFamily: 'var(--font-linka)', fontWeight: 200,
              fontSize: 'clamp(1.9rem,3.6vw,3rem)', lineHeight: 1.2,
              color: 'var(--tz-paper)', margin: 0, maxWidth: '560px' }}>
              {c.universHeading}
            </h2>
          </div>
          <div style={{ borderLeft: '1px solid var(--tz-line)', paddingLeft: '2rem',
            display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '360px',
            justifySelf: 'end' }}>
            {c.universIntro.map((p) => (
              <p key={p} style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                color: 'var(--tz-paper-dim)', lineHeight: 1.65, margin: 0 }}>{p}</p>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto',
          padding: '2.5rem 2rem 2rem', scrollSnapType: 'x mandatory' }}>
          {c.univers.map((u) => (
            <Link key={u.title} href="/services"
              style={{ flexShrink: 0, scrollSnapAlign: 'start',
                width: 'min(920px, 88vw)', textDecoration: 'none',
                position: 'relative', display: 'block' }}>
              {/* bande de couleur sourde */}
              <div style={{ position: 'absolute', left: 0, right: 0, top: '3rem', bottom: 0,
                background: u.bg }} />
              {/* image décalée sur la bande */}
              <div style={{ position: 'relative', margin: '0 3rem 0 4rem', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={u.img} alt={u.title}
                  style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
                <p style={{ position: 'absolute', left: '1.4rem', bottom: '1.2rem',
                  fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.92)', textShadow: '0 1px 6px rgba(0,0,0,0.5)', margin: 0 }}>
                  {u.baseline}
                </p>
              </div>
              {/* titre géant chevauchant bande et image */}
              <h3 style={{ position: 'relative', fontFamily: 'var(--font-linka)', fontWeight: 200,
                fontSize: 'clamp(2.6rem,6vw,4.8rem)', lineHeight: 1, color: 'var(--tz-paper)',
                margin: '-2.2rem 0 0 1.2rem', paddingBottom: '2rem',
                textShadow: '0 2px 12px rgba(44,41,38,0.35)' }}>
                {u.title}
              </h3>
              <span className="tz-discover" style={{ position: 'absolute', right: '1.5rem', bottom: '1.6rem',
                color: 'var(--tz-bg)' }}>
                {c.discover}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Expertises : sections immersives ─────────────────────── */}
      <section style={{ borderTop: '1px solid var(--tz-line)' }}>
        <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '5rem 2rem 0' }}>
          <p className="tz-chip">{c.expertisesLabel}</p>
        </div>
        {c.expertises.map((e) => (
          <Link key={e.title} href={e.href}
            style={{ position: 'relative', display: 'block', minHeight: '78vh',
              overflow: 'hidden', textDecoration: 'none',
              borderBottom: '1px solid var(--tz-line)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={e.img} alt=""
              aria-hidden="true"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', opacity: 0.38,
                transition: 'opacity 0.6s, transform 1.2s ease' }}
              className="hover:opacity-55" />
            <div style={{ position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(44,41,38,0.85) 0%, rgba(44,41,38,0.25) 60%)' }} />

            {/* tagline centrée + colonne de texte à droite */}
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '1500px', margin: '0 auto',
              padding: '7rem 2rem 0', display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem' }}>
              <p style={{ fontFamily: 'var(--font-linka)', fontWeight: 300,
                fontSize: 'clamp(1.3rem,2.4vw,1.9rem)', lineHeight: 1.35,
                color: 'var(--tz-paper)', margin: '3rem 0 0', maxWidth: '460px' }}>
                {e.tagline}
              </p>
              <div style={{ borderLeft: '1px solid var(--tz-line)', paddingLeft: '2rem',
                maxWidth: '340px', justifySelf: 'end' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                  color: 'var(--tz-paper-dim)', lineHeight: 1.65, margin: '0 0 1.6rem' }}>
                  {e.desc}
                </p>
                <span className="tz-discover">{c.discover}</span>
              </div>
            </div>

            {/* mot géant en bas */}
            <h3 style={{ position: 'absolute', left: '2rem', right: '2rem', bottom: '1.5rem', zIndex: 2,
              fontFamily: 'var(--font-linka)', fontWeight: 200,
              fontSize: 'clamp(2.4rem,7vw,6rem)', lineHeight: 1,
              color: 'var(--tz-paper)', margin: 0, whiteSpace: 'nowrap',
              overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {e.title}
            </h3>
          </Link>
        ))}
      </section>

      {/* ── Éditorial : bande de reportages ──────────────────────── */}
      {posts.length > 0 && (
        <section style={{ padding: '5rem 0 6rem' }}>
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
