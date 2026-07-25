'use client'

import Link from 'next/link'
import { EditorialCarousel } from '@/components/EditorialCarousel'
import { ServicesMenu } from '@/components/ServicesMenu'
import { ClientsCarousel } from '@/components/ClientsCarousel'
import { useLocale } from '@/components/LocaleProvider'

export default function HomePageClient({ posts }: { posts: any[] }) {
  const { t } = useLocale()

  return (
    <div style={{ background: 'var(--tz-sand)', color: 'var(--tz-ink)' }}>
      <section
        style={{
          paddingTop: '100px',
          overflow: 'hidden',
          background:
            'linear-gradient(180deg, var(--tz-sand) 0%, var(--tz-lagoon-soft) 55%, var(--tz-sand) 100%)',
        }}
      >
        <div style={{ padding: '2rem 2rem 0', maxWidth: '1400px', margin: '0 auto', textAlign: 'right' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--tz-lagoon-deep)',
              marginBottom: '0.75rem',
            }}
          >
            {t('home.tagline')}
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem,11vw,96px)',
              lineHeight: '0.95',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              color: 'var(--tz-ink)',
              marginBottom: '1rem',
            }}
          >
            {t('home.slogan1')}
          </h1>
        </div>

        {posts.length > 0 && (
          <div style={{ margin: '1rem 0' }}>
            <EditorialCarousel posts={posts} />
          </div>
        )}

        <div style={{ padding: '0.75rem 2rem 4rem', maxWidth: '1400px', margin: '0 auto', textAlign: 'right' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem,11vw,96px)',
              lineHeight: '0.95',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              background: 'linear-gradient(90deg, var(--tz-lagoon-deep) 0%, var(--tz-coral-deep) 60%, var(--tz-hibiscus-deep) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '2.5rem',
            }}
          >
            {t('home.slogan2')}
          </h2>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <Link href="/editorial" className="tz-btn">
              {t('home.editorial')}
            </Link>

            <Link href="/contact" className="tz-btn-ghost">
              {t('home.contact')}
            </Link>
          </div>
        </div>
      </section>

      <section id="services" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p className="tz-chip" style={{ marginBottom: '4rem' }}>
            {t('home.services')}
          </p>
          <ServicesMenu />
        </div>
      </section>

      <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, var(--tz-coral-soft) 0%, var(--tz-hibiscus-soft) 50%, var(--tz-frangipani-soft) 100%)',
            borderRadius: '2rem',
            padding: '4.5rem 2rem',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem,4.5vw,3.5rem)',
              fontWeight: 400,
              textTransform: 'uppercase',
              lineHeight: 1.05,
              letterSpacing: '0.04em',
              color: 'var(--tz-ink)',
              marginBottom: '2.5rem',
            }}
          >
            {t('home.devis')}
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
