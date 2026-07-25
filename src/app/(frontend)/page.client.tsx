'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { EditorialCarousel } from '@/components/EditorialCarousel'
import { ServicesMenu } from '@/components/ServicesMenu'
import { ClientsCarousel } from '@/components/ClientsCarousel'
import { useLocale } from '@/components/LocaleProvider'

/* Fondu enchaîné des photographies de reportage en fond de hero */
function HeroBackdrop({ posts }: { posts: any[] }) {
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

  if (images.length === 0) return <div style={{ position: 'absolute', inset: 0, background: '#111' }} />

  return (
    <>
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} src={src} alt="" aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: i === index ? 1 : 0,
            transform: i === index ? 'scale(1.04)' : 'scale(1)',
            transition: 'opacity 1.6s ease, transform 6s linear',
          }} />
      ))}
    </>
  )
}

export default function HomePageClient({ posts }: { posts: any[] }) {
  const { t } = useLocale()

  return (
    <div style={{ background: 'white', color: '#111' }}>
      {/* ── Hero plein écran, titres blancs en bas à gauche ─────── */}
      <section style={{ position: 'relative', height: '100svh', minHeight: '560px', overflow: 'hidden' }}>
        <HeroBackdrop posts={posts} />
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.30) 100%)' }} />

        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0,
          maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 3.5rem', zIndex: 2 }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.75)',
            marginBottom: '1rem',
          }}>
            {t('home.tagline')}
          </p>

          <h1 style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(2.5rem,10vw,76px)',
            lineHeight: '1.0',
            fontWeight: 300,
            textTransform: 'uppercase',
            color: 'white',
            marginBottom: '0.25rem',
          }}>
            {t('home.slogan1')}
          </h1>

          <h2 style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(2.5rem,10vw,76px)',
            lineHeight: '1.0',
            fontWeight: 300,
            textTransform: 'uppercase',
            color: 'white',
            marginBottom: '2.5rem',
          }}>
            {t('home.slogan2')}
          </h2>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            <Link href="/editorial" style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,0.85)',
              padding: '0.8rem 2rem',
              color: 'white',
              textDecoration: 'none',
            }}>
              {t('home.editorial')}
            </Link>

            <Link href="/contact" style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.75)',
              textDecoration: 'none',
            }}>
              {t('home.contact')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Univers : diaporama horizontal, collé au hero ────────── */}
      {posts.length > 0 && (
        <section style={{ padding: 0, lineHeight: 0 }}>
          <EditorialCarousel posts={posts} />
        </section>
      )}

      <ServicesMenu />

      <section style={{ padding: '6rem 2rem', background: '#f5f5f5', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(1.5rem,3vw,2.5rem)',
              fontWeight: 300,
              textTransform: 'uppercase',
              lineHeight: 1.1,
              letterSpacing: '0.08em',
              color: '#111',
              marginBottom: '2.5rem',
            }}
          >
            {t('home.devis')}
          </h2>

          <Link
            href="/contact"
            className="devis-cta"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              border: '1px solid #444',
              padding: '1.2rem 4rem',
              color: '#444',
              textDecoration: 'none',
              display: 'inline-block',
              background: 'white',
              transition: 'all 0.3s',
            }}
          >
            {t('home.devis_btn')}
          </Link>
        </div>
      </section>

      <ClientsCarousel />
    </div>
  )
}
