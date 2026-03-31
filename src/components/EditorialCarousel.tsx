'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'

export function EditorialCarousel({ posts }: { posts: any[] }) {
  const [active, setActive] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'right' ? 400 : -400, behavior: 'smooth' })
  }

  return (
    <div className="relative w-full">

      {/* Navigation */}
      <div className="container flex items-center justify-between mb-8">
        <p className="text-xs tracking-widest uppercase text-white/40">
          {posts.length} publication{posts.length > 1 ? 's' : ''}
        </p>
        <div className="flex gap-3">
          <button onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll horizontal */}
      <div ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 px-6 md:px-12"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        {posts.map((post, i) => {
          const img = post.coverImage?.url || post.heroImage?.url || null
          const date = post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
            : null

          return (
            <div key={post.id}
              style={{ scrollSnapAlign: 'start', flexShrink: 0, width: 'clamp(280px, 35vw, 420px)' }}
              className="group relative cursor-pointer"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}>

              {/* Image */}
              <div className="relative overflow-hidden bg-white/5"
                style={{ aspectRatio: '3/4', borderRadius: '4px' }}>
                {img ? (
                  <img src={img} alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white/20 text-6xl font-light">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                {/* Contenu overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-xs tracking-widest uppercase text-white/50 mb-2">
                    {date}
                  </p>
                  <h3 className="text-lg font-light text-white leading-snug mb-4">
                    {post.title}
                  </h3>

                  {/* Boutons */}
                  <div className="flex gap-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {post.facebookUrl && (
                      <a href={post.facebookUrl} target="_blank" rel="noopener noreferrer"
                        className="text-xs tracking-widest uppercase border border-white/40 px-3 py-1.5 hover:bg-white hover:text-black transition-all">
                        Facebook →
                      </a>
                    )}
                    <Link href={`/posts/${post.slug}`}
                      className="text-xs tracking-widest uppercase border border-white/40 px-3 py-1.5 hover:bg-white hover:text-black transition-all">
                      Lire →
                    </Link>
                  </div>
                </div>

                {/* Numéro */}
                <div className="absolute top-4 right-4">
                  <span className="text-xs text-white/30 tracking-widest">
                    /{String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

            </div>
          )
        })}
      </div>

    </div>
  )
}
