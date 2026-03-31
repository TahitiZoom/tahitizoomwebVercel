import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { EditorialCarousel } from '@/components/EditorialCarousel'
import Link from 'next/link'
import { ServicesMenu } from '@/components/ServicesMenu'
import { ClientsCarousel } from '@/components/ClientsCarousel'

export const revalidate = 60

async function getPosts() {
  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'posts',
      sort: '-publishedAt',
      limit: 10,
      where: { _status: { equals: 'published' } },
    })
    return res.docs
  } catch { return [] }
}

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <div style={{ background: 'white', color: '#111' }}>

      {/* Hero */}
      <section style={{ paddingTop: '100px', overflow: 'hidden' }}>

        {/* Ligne 1 - alignée à droite */}
        <div style={{ padding: '2rem 2rem 0', maxWidth: '1400px', margin: '0 auto', textAlign: 'right' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.35em',
            textTransform: 'uppercase', color: '#999', marginBottom: '0.75rem' }}>
            Reporter Photographe · Polynésie française
          </p>
          <h1 style={{
          fontFamily: 'Manrope, sans-serif',
  	  fontSize: '76px',
          lineHeight: '76px',
          fontWeight: 300,
          textTransform: 'uppercase',
          color: '#111',
          marginBottom: '1rem',
	  }}>
            LÀ OÙ L'IMAGE
          </h1>
        </div>

        {/* Carousel intercalé */}
        {posts.length > 0 && (
          <div style={{ margin: '1rem 0' }}>
            <EditorialCarousel posts={posts} />
          </div>
        )}

        {/* Ligne 2 - alignée à droite */}
        <div style={{ padding: '0.75rem 2rem 4rem', maxWidth: '1400px', margin: '0 auto', textAlign: 'right' }}>
          <h2 style={{
          fontFamily: 'Manrope, sans-serif',
  	  fontSize: '76px',
          lineHeight: '76px',
          fontWeight: 300,
          textTransform: 'uppercase',
          color: '#111',
          marginBottom: '1rem',
	  }}>
            RENCONTRE LE CODE
          </h2>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Link href="/editorial" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', border: '1px solid #111', padding: '0.8rem 2rem',
              color: '#111', textDecoration: 'none',
            }}>
              Éditorial
            </Link>
            <Link href="/contact" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: '#999', textDecoration: 'none',
            }}>
              Contact →
            </Link>
          </div>
        </div>
      </section>
      {/* Services */}
      <section id="services" style={{ padding: '6rem 2rem', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.35em',
            textTransform: 'uppercase', color: '#999', marginBottom: '4rem' }}>
            Ce que je propose
          </p>
          <ServicesMenu />
        </div>
      </section>
    </div>
  )
}
