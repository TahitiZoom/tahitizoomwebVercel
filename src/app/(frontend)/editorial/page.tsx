import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { EditorialCarousel } from '@/components/EditorialCarousel'

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
      <div className="container mb-12">
        <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Reportages & Articles</p>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight">Éditorial</h1>
      </div>

      {posts.length > 0 ? (
        <EditorialCarousel posts={posts} />
      ) : (
        <div className="container text-center py-32">
          <p className="text-white/20 text-3xl font-light mb-4">Aucun article</p>
          <p className="text-xs text-white/30 tracking-widest uppercase">
            Ajoutez vos posts depuis l'<a href="/admin" className="text-white/50 hover:text-white">admin</a>
          </p>
        </div>
      )}
    </div>
  )
}
