import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

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
      <div className="container max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Reportages & Articles</p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight">Éditorial</h1>
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="flex flex-col gap-12">
            {posts.map((post: any) => (
              <article key={post.id} className="border-t border-white/10 pt-8">
                {/* Meta */}
                <div className="flex items-center gap-4 mb-4">
                  {post.categories?.length > 0 && (
                    <span className="text-xs tracking-widest uppercase text-white/40">
                      {post.categories[0]?.title || ''}
                    </span>
                  )}
                  {post.publishedAt && (
                    <span className="text-xs text-white/30">
                      {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-light text-white mb-6">{post.title}</h2>

                {/* oEmbed Facebook responsive */}
                {post.facebookUrl ? (
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '500px',
                    margin: '0 auto',
                  }}>
                    <iframe
                      src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(post.facebookUrl)}&show_text=true&width=500&lazy=true`}
                      style={{
                        width: '100%',
                        minHeight: '600px',
                        border: 'none',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        background: '#fff',
                      }}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />
                  </div>
                ) : (
                  post.heroImage?.url && (
                    <img src={post.heroImage.url} alt={post.title}
                      className="w-full rounded-lg object-cover" style={{ maxHeight: '500px' }} />
                  )
                )}

              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="text-white/20 text-3xl font-light mb-4">Aucun article</p>
            <p className="text-xs text-white/30 tracking-widest uppercase">
              Ajoutez vos posts depuis l'<a href="/admin" className="text-white/50 hover:text-white">admin</a>
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
