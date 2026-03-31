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
  } catch {
    return []
  }
}

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-16 pb-20 pt-36 overflow-hidden bg-black text-white">
        <div className="max-w-screen-xl mx-auto w-full">
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem' }}>
            Reporter Photographe · Polynésie française
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem,14vw,13rem)',
            lineHeight: 0.9,
            letterSpacing: '0.02em',
            color: 'white',
            marginBottom: '2.5rem',
          }}>
            LÀ OÙ<br />
            L'IMAGE<br />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>PARLE.</span>
          </h1>
          <div className="flex gap-4">
            <Link href="/editorial"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.3)', padding: '0.8rem 2rem', color: 'white',
                transition: 'all 0.3s' }}
              className="hover:bg-white hover:text-black">
              Éditorial
            </Link>
            <Link href="/contact"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)', alignSelf: 'center', transition: 'color 0.3s' }}
              className="hover:text-white">
              Contact →
            </Link>
          </div>
        </div>
      </section>

      {/* Carousel */}
      {posts.length > 0 && (
        <section className="bg-black py-16">
          <div className="px-6 md:px-12 flex items-baseline justify-between mb-8">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
              Dernières publications
            </p>
            <Link href="/editorial"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}
              className="hover:text-white transition-colors">
              Tout voir →
            </Link>
          </div>
          <EditorialCarousel posts={posts} />
        </section>
      )}

      {/* Services */}
      <section className="bg-black py-24 px-6 md:px-16" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-screen-xl mx-auto">
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '4rem' }}>
            Ce que je propose
          </p>
          {[
            { n: '01', t: 'Photographie',  d: 'Reportages, portraits, culture polynésienne.' },
            { n: '02', t: 'Développement', d: 'Applications web Next.js, APIs, CMS sur mesure.' },
            { n: '03', t: 'Web Design',    d: 'Interfaces élégantes et expériences mémorables.' },
            { n: '04', t: 'Infographie',   d: 'Identité visuelle, logos, supports print.' },
          ].map((s) => (
            <Link key={s.n} href="/services"
              className="group flex items-center justify-between py-6 hover:bg-white/5 transition-all px-2 -mx-2"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-baseline gap-6">
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em' }}>/{s.n}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,4rem)', color: 'white', letterSpacing: '0.05em' }}
                  className="group-hover:text-white/60 transition-colors">{s.t}</span>
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }} className="hidden md:block max-w-xs">{s.d}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
