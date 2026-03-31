import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const metadata: Metadata = {
  title: 'Éditorial',
  description: 'Reportages, portraits et articles de Stéphane Sayeb — Tahiti Zoom.',
}

export const revalidate = 60

export default async function EditorialPage() {
  let articles: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'posts',
      sort: '-publishedAt',
      limit: 20,
    })
    articles = res.docs
  } catch {}

  return (
    <div className="min-h-screen pt-32 pb-24 bg-black text-white" data-theme="dark">
      <div className="container">
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Reportages & Articles</p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight">Éditorial</h1>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any) => (
              <div key={article.id} className="flex flex-col gap-3">
                {article.category && (
                  <p className="text-xs tracking-widest uppercase text-white/40">{article.category}</p>
                )}
                {article.publishedAt && (
                  <p className="text-xs text-white/30">
                    {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                )}
                <iframe
                  src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(article.facebookUrl)}&show_text=true&width=500`}
                  width="100%"
                  height="500"
                  style={{ border: 'none', overflow: 'hidden', borderRadius: '8px' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="text-white/20 text-3xl font-light mb-4">Aucun article</p>
            <p className="text-xs text-white/30 tracking-widest uppercase">
              Ajoutez vos liens Facebook depuis l'<a href="/admin" className="text-white/50 hover:text-white">admin</a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
