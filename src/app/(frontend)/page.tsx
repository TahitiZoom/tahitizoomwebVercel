import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { EditorialCarousel } from '@/components/EditorialCarousel'
import Link from 'next/link'

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
      <section style={{ paddingTop: '120px', paddingBottom: '0', overflow: 'hidden' }}>
        
        {/* Ligne 1 */}
        <div style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.35em',
            textTransform: 'uppercase', color: '#999', marginBottom: '1rem' }}>
            Reporter Photographe · Polynésie française
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(5rem,13vw,12rem)',
            lineHeight: 0.88, letterSpacing: '0.03em', color: '#111', fontWeight: 400,
            marginBottom: '1.5rem' }}>
            LÀ OÙ L'IMAGE
          </h1>
        </div>

        {/* Carousel intercalé */}
        {posts.length > 0 && (
          <div style={{ margin: '1.5rem 0' }}>
            <EditorialCarousel posts={posts} />
          </div>
        )}

        {/* Ligne 2 */}
        <div style={{ padding: '1.5rem 2rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(5rem,13vw,12rem)',
            lineHeight: 0.88, letterSpacing: '0.03em', color: '#111', fontWeight: 400,
            marginBottom: '3rem' }}>
            RENCONTRE LE CODE
          </h2>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link href="/editorial" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', border: '1px solid #111', padding: '0.8rem 2rem',
              color: '#111', textDecoration: 'none', transition: 'all 0.3s',
            }}
            className="hover:bg-black hover:text-white">
              Éditorial
            </Link>
            <Link href="/contact" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: '#999', textDecoration: 'none',
            }}
            className="hover:text-black transition-colors">
              Contact →
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '6rem 2rem', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.35em',
            textTransform: 'uppercase', color: '#999', marginBottom: '4rem' }}>
            Ce que je propose
          </p>
          {[
            { n: '01', t: 'Photographie',  d: 'Reportages, portraits, culture polynésienne.' },
            { n: '02', t: 'Développement', d: 'Applications web Next.js, APIs, CMS sur mesure.' },
            { n: '03', t: 'Web Design',    d: 'Interfaces élégantes et expériences mémorables.' },
            { n: '04', t: 'Infographie',   d: 'Identité visuelle, logos, supports print.' },
          ].map((s) => (
            <Link key={s.n} href="/services"
              className="group flex items-center justify-between py-6 hover:bg-black/3 transition-all px-2 -mx-2"
              style={{ borderTop: '1px solid rgba(0,0,0,0.08)', textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: '#ccc', letterSpacing: '0.2em' }}>/{s.n}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,4rem)',
                  color: '#111', letterSpacing: '0.05em' }}
                  className="group-hover:opacity-50 transition-opacity">{s.t}</span>
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#999' }}
                className="hidden md:block">{s.d}</span>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
