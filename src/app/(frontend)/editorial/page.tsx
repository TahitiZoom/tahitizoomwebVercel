import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Éditorial',
  description: 'Reportages, portraits et articles de Stéphane Sayeb — Tahiti Zoom.',
}

export const revalidate = 60

export default async function EditorialPage() {
  let posts: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'posts',
      sort: '-publishedAt',
      limit: 20,
      where: { _status: { equals: 'published' } },
    })
    posts = res.docs
  } catch {}

  return (
    <div className="min-h-screen pt-32 pb-24 bg-black text-white" data-theme="dark">
      <div className="container">
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Reportages & Articles</p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight">Éditorial</h1>
        </div>

        {posts.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {posts.map((post: any) => {
              const img = post.coverImage?.url || post.heroImage?.url || null
              const date = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })
                : null

              return (
                <Link key={post.id} href={`/posts/${post.slug}`}
                  className="group block break-inside-avoid mb-4 relative overflow-hidden bg-white/5">
                  {img && (
                    <img src={img} alt={post.title}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {date && <p className="text-xs text-white/40 tracking-widest mb-1">{date}</p>}
                    <h2 className="text-base font-light text-white">{post.title}</h2>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="text-white/20 text-3xl font-light">Aucun article</p>
          </div>
        )}
      </div>
    </div>
  )
}
