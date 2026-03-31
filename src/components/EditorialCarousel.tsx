'use client'
import { useRef } from 'react'
import Link from 'next/link'

export function EditorialCarousel({ posts }: { posts: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'right' ? 420 : -420, behavior: 'smooth' })
  }

  return (
    <div className="relative w-full">
      <div className="px-6 md:px-12 flex items-center justify-between mb-8">
        <p className="text-xs tracking-widest uppercase text-white/40">
          {posts.length} publication{posts.length > 1 ? 's' : ''}
        </p>
        <div className="flex gap-3">
          <button onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all duration-300">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-6 md:px-12 pb-6"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        {posts.map((post, i) => {
          const img = post.coverImage?.url || post.heroImage?.url || null
          return (
            <Link key={post.id} href={`/posts/${post.slug}`}
              className="group relative block overflow-hidden flex-shrink-0"
              style={{
                scrollSnapAlign: 'start',
                width: 'clamp(260px, 32vw, 400px)',
                aspectRatio: '3/4',
                borderRadius: '4px',
              }}>

              {img ? (
                <img src={img} alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
                  <span className="text-white/20 text-6xl font-light">{String(i + 1).padStart(2, '0')}</span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs tracking-widest uppercase text-white/40 mb-2">/{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-lg font-light text-white leading-snug mb-3">{post.title}</h3>
                <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white/50 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  Lire
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>

              {post.publishedAt && (
                <div className="absolute top-4 right-4">
                  <span className="text-xs text-white/30">
                    {new Date(post.publishedAt).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              )}

            </Link>
          )
        })}
      </div>
    </div>
  )
}
