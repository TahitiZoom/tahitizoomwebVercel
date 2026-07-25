'use client'

import Link from 'next/link'
import { EditorialCarousel } from '@/components/EditorialCarousel'
import { ServicesMenu } from '@/components/ServicesMenu'
import { ClientsCarousel } from '@/components/ClientsCarousel'
import { useLocale } from '@/components/LocaleProvider'

const marqueeWords = {
  fr: ['Photographie', 'Éditorial', 'Développement', 'Web Design', 'Infographie'],
  en: ['Photography', 'Editorial', 'Development', 'Web Design', 'Infographics'],
}

export default function HomePageClient({ posts }: { posts: any[] }) {
  const { t, locale } = useLocale()
  const words = marqueeWords[locale] || marqueeWords.fr
  const marqueeTrack = [...words, ...words, ...words]

  return (
    <div style={{ background: 'var(--tz-bg)', color: 'var(--tz-paper)' }}>
      <section style={{ paddingTop: '100px', overflow: 'hidden' }}>
        <div style={{ padding: '3rem 2rem 0', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <p className="tz-chip">{t('home.tagline')}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem',
              letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--tz-paper-faint)' }}>
              Faa&apos;a — 17.55° S / 149.61° W
            </p>
          </div>

          <h1 style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(2.8rem,10vw,110px)',
            lineHeight: '0.95',
            fontWeight: 300,
            textTransform: 'uppercase',
            letterSpacing: '0.01em',
            color: 'var(--tz-paper)',
            marginBottom: '0.5rem',
          }}>
            {t('home.slogan1')}
          </h1>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(2.8rem,10vw,110px)',
            lineHeight: '1',
            textTransform: 'lowercase',
            color: 'var(--tz-paper)',
            marginBottom: '3rem',
          }}>
            {t('home.slogan2')}<span style={{ color: 'var(--tz-accent)' }}>.</span>
          </h2>
        </div>

        {posts.length > 0 && (
          <div style={{ margin: '1rem 0 0' }}>
            <EditorialCarousel posts={posts} />
          </div>
        )}

        <div style={{ padding: '2.5rem 2rem 5rem', maxWidth: '1400px', margin: '0 auto',
          display: 'flex', gap: '2.5rem', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <Link href="/editorial" className="tz-btn">
            {t('home.editorial')}
          </Link>
          <Link href="/contact" style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem',
            letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--tz-paper-dim)',
            textDecoration: 'none', borderBottom: '1px solid var(--tz-line)', paddingBottom: '4px' }}
            className="hover:text-white transition-colors">
            {t('home.contact')}
          </Link>
        </div>
      </section>

      {/* Bandeau défilant */}
      <div style={{ borderTop: '1px solid var(--tz-line)', borderBottom: '1px solid var(--tz-line)',
        overflow: 'hidden', padding: '1.1rem 0' }}>
        <div className="tz-marquee">
          {marqueeTrack.map((word, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 300,
                fontSize: '1.1rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'var(--tz-paper-dim)', whiteSpace: 'nowrap' }}>
                {word}
              </span>
              <span aria-hidden="true" style={{ color: 'var(--tz-accent)', margin: '0 2rem', fontSize: '0.8rem' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      <section id="services" style={{ padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p className="tz-chip" style={{ marginBottom: '4rem' }}>
            {t('home.services')}
          </p>
          <ServicesMenu />
        </div>
      </section>

      <section style={{ padding: '7rem 2rem', borderTop: '1px solid var(--tz-line)', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(2.2rem,6vw,4.5rem)',
            textTransform: 'lowercase',
            lineHeight: 1.05,
            color: 'var(--tz-paper)',
            marginBottom: '3rem',
          }}>
            {t('home.devis')}<span style={{ color: 'var(--tz-accent)' }}>.</span>
          </h2>

          <Link href="/contact" className="tz-btn" style={{ padding: '1.2rem 4rem' }}>
            {t('home.devis_btn')}
          </Link>
        </div>
      </section>

      <ClientsCarousel />
    </div>
  )
}
