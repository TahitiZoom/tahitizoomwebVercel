'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '@/components/LocaleProvider'
import { useEffect, useState } from 'react'

const POSTS_PER_PAGE = 20

export default function EditorialPage() {
  const { t } = useLocale()
  const [posts, setPosts] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  // ─── Filtre par année ─────────────────────────────────────────
  const [availableYears, setAvailableYears] = useState<number[]>([])
  const [selectedYear, setSelectedYear] = useState<number | null>(null) // null = "Toutes"

  // Charger les années disponibles au montage
  useEffect(() => {
    fetch(`/api/posts?limit=0&where[_status][equals]=published&sort=-publishedAt`)
      .then(r => r.json())
      .then(d => {
        const docs = d.docs || []
        const years = new Set<number>()
        docs.forEach((post: any) => {
          if (post.publishedAt) {
            years.add(new Date(post.publishedAt).getFullYear())
          }
        })
        const sorted = Array.from(years).sort((a, b) => b - a)
        setAvailableYears(sorted)
      })
      .catch(() => {})
  }, [])

  // Charger les posts (avec filtre année si sélectionné)
  useEffect(() => {
    setLoading(true)

    let url = `/api/posts?limit=${POSTS_PER_PAGE}&page=${currentPage}&where[_status][equals]=published&sort=-publishedAt`

    if (selectedYear !== null) {
      const start = `${selectedYear}-01-01T00:00:00.000Z`
      const end = `${selectedYear}-12-31T23:59:59.999Z`
      url += `&where[publishedAt][greater_than_equal]=${start}&where[publishedAt][less_than_equal]=${end}`
    }

    fetch(url)
      .then(r => r.json())
      .then(d => {
        setPosts(d.docs || [])
        setTotalPages(d.totalPages || 1)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [currentPage, selectedYear])

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const selectYear = (year: number | null) => {
    setSelectedYear(year)
    setCurrentPage(1) // Reset à la page 1 quand on change de filtre
  }

  return (
    <div style={{ background: 'var(--tz-bg)', color: 'var(--tz-paper)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '8rem 2rem 4rem' }}>
        <div className="mb-16">
          <p className="tz-chip mb-6">{t('editorial.subtitle')}</p>
          <h1 className="text-5xl md:text-7xl" style={{ fontFamily: 'var(--font-linka)', fontWeight: 200, color: 'var(--tz-paper)', letterSpacing: '0.01em' }}>{t('editorial.title')}</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--tz-paper-dim)',
            maxWidth: '600px', lineHeight: '1.7', marginTop: '1.5rem' }}>
            {t('editorial.description')}
          </p>
        </div>

        {/* ─── Filtre par année ─────────────────────────────────── */}
        {availableYears.length > 1 && (
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <button
              onClick={() => selectYear(null)}
              className="px-4 py-1.5 text-sm tracking-wide transition-all duration-200"
              style={{
                background: selectedYear === null ? 'var(--tz-paper)' : 'transparent',
                color: selectedYear === null ? 'var(--tz-bg)' : 'var(--tz-paper-dim)',
                border: '1px solid ' + (selectedYear === null ? 'var(--tz-paper)' : 'var(--tz-line)'),
              }}
            >
              {t('editorial.filterAll') || 'Toutes'}
            </button>
            {availableYears.map(year => (
              <button
                key={year}
                onClick={() => selectYear(year)}
                className="px-4 py-1.5 text-sm tracking-wide transition-all duration-200"
                style={{
                  background: selectedYear === year ? 'var(--tz-paper)' : 'transparent',
                  color: selectedYear === year ? 'var(--tz-bg)' : 'var(--tz-paper-dim)',
                  border: '1px solid ' + (selectedYear === year ? 'var(--tz-paper)' : 'var(--tz-line)'),
                }}
              >
                {year}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center py-32">
            <p className="text-xl" style={{ color: 'var(--tz-paper-faint)' }}>Chargement...</p>
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
              {posts.map((post: any) => {
                const img =
                  post.coverImage?.sizes?.medium?.url ||
                  post.coverImage?.sizes?.small?.url ||
                  post.coverImage?.sizes?.thumbnail?.url ||
                  post.coverImage?.url ||
                  null
                const date = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                      year: 'numeric', month: 'long', day: 'numeric' })
                  : null
                return (
                  <Link key={post.id} href={`/posts/${post.slug}`}
                    className="group block break-inside-avoid mb-4 relative overflow-hidden" style={{ background: 'var(--tz-bg-soft)', boxShadow: '0 6px 18px rgba(0,0,0,0.35)' }}>
                    {img && (
                      <div className="relative w-full">
                        <Image
                          src={img}
                          alt={post.title}
                          width={900}
                          height={600}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, rgba(10,10,12,0.9), transparent 60%)' }} />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      {date && <p className="text-xs text-white/60 tracking-widest mb-1">{date}</p>}
                      <h2 className="text-base font-light text-white">{post.title}</h2>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm disabled:opacity-30 disabled:cursor-not-allowed" style={{ color: 'var(--tz-paper-dim)' }}
                >
                  Premiere
                </button>
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1" style={{ color: 'var(--tz-paper-dim)', border: '1px solid var(--tz-line)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  Precedent
                </button>

                <span className="px-4 py-2 text-sm" style={{ color: 'var(--tz-paper-faint)' }}>
                  Page {currentPage} sur {totalPages}
                </span>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1" style={{ color: 'var(--tz-paper-dim)', border: '1px solid var(--tz-line)' }}
                >
                  Suivant
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm disabled:opacity-30 disabled:cursor-not-allowed" style={{ color: 'var(--tz-paper-dim)' }}
                >
                  Derniere
                </button>
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-32">
            <p className="text-3xl font-light" style={{ color: 'var(--tz-paper-faint)' }}>
              {selectedYear
                ? `${t('editorial.noPostsYear') || 'Aucun article en'} ${selectedYear}`
                : (t('editorial.noPosts') || 'Aucun article')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
