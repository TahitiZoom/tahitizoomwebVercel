'use client'
import Link from 'next/link'
import { useLocale } from '@/components/LocaleProvider'
import { useEffect, useState } from 'react'

export default function EditorialPage() {
  const { t } = useLocale()
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/posts?limit=20&where[_status][equals]=published&sort=-publishedAt')
      .then(r => r.json())
      .then(d => setPosts(d.docs || []))
      .catch(() => {})
  }, [])

  return (
    <div style={{ background: 'white', color: '#111', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '8rem 2rem 4rem' }}>
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-black/40 mb-4">{t('editorial.subtitle')}</p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-black">{t('editorial.title')}</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#777',
            maxWidth: '600px', lineHeight: '1.8', marginTop: '1.5rem' }}>
            {t('editorial.description')}
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {posts.map((post: any) => {
              const img = post.coverImage?.url || null
              const date = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                    year: 'numeric', month: 'long', day: 'numeric' })
                : null
              return (
                <Link key={post.id} href={`/posts/${post.slug}`}
                  className="group block break-inside-avoid mb-4 relative overflow-hidden bg-black/5">
                  {img && <img src={img} alt={post.title}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {date && <p className="text-xs text-white/60 tracking-widest mb-1">{date}</p>}
                    <h2 className="text-base font-light text-white">{post.title}</h2>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="text-black/20 text-3xl font-light">Aucun article</p>
          </div>
        )}
      </div>
    </div>
  )
}
