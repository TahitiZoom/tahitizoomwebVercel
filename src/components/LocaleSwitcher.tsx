'use client'
import { useLocale } from './LocaleProvider'

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
      <button
        onClick={() => setLocale('fr')}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          fontWeight: locale === 'fr' ? 700 : 400,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: locale === 'fr' ? '#111' : '#999',
          background: 'rgba(17,17,17,0.05)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: 'none',
          cursor: 'pointer',
          padding: '0.16rem 0.45rem',
          transition: 'color 0.2s, background 0.35s ease',
        }}>
        FR
      </button>
      <span style={{ color: '#ccc', fontSize: '0.7rem' }}>|</span>
      <button
        onClick={() => setLocale('en')}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          fontWeight: locale === 'en' ? 700 : 400,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: locale === 'en' ? '#111' : '#999',
          background: 'rgba(17,17,17,0.05)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: 'none',
          cursor: 'pointer',
          padding: '0.16rem 0.45rem',
          transition: 'color 0.2s, background 0.35s ease',
        }}>
        EN
      </button>
    </div>
  )
}
