import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Éditorial',
  description: 'Reportages, portraits et articles de Stéphane Sayeb — Tahiti Zoom.',
}

export const revalidate = 60

export default async function EditorialPage() {
  let posts: any[] = []
  let totalDocs = 0

  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'posts',
      sort: '-publishedAt',
      limit: 12,
      where: { _status: { equals: 'published' } },
    })
    posts = res.docs
    totalDocs = res.totalDocs
  } catch {}

  return (
    <div className="min-h-screen pt-32 pb-24 bg-black text-white" data-theme="dark">
      <div className="container">

        {/* Header */}
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Reportages & Articles</p>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight">Éditorial</h1>
            <p className="text-xs text-white/40 tracking-widest">{totalDocs} article{totalDocs > 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Grille articles */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => {
              const imgUrl = post.heroImage?.url || null
              const date = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })
                : null

              return (
                <article key={post.id} className="group border border-white/10 hover:border-white/30 transition-all duration-300">
                  <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                    {imgUrl && (
                      <Image src={imgUrl} alt={post.title} fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width:768px) 100vw, 33vw" />
                    )}
                  </div>
                  <div className="p-5">
                    {date && <p className="text-xs text-white/30 tracking-widest uppercase mb-2">{date}</p>}
                    <h2 className="text-xl font-light text-white mb-3 leading-snug">{post.title}</h2>
                    {post.meta?.description && (
                      <p className="text-sm text-white/50 leading-relaxed line-clamp-2 mb-4">{post.meta.description}</p>
                    )}
                    <Link href={`/posts/${post.slug}`}
                      className="text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors">
                      Lire →
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="text-white/20 text-3xl font-light">Aucun article</p>
            <p className="text-xs text-white/30 tracking-widest uppercase mt-4">
              Ajoutez des articles depuis l'<a href="/admin" className="text-white/50 hover:text-white">admin</a>
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
