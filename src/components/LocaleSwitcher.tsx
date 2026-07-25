'use client'
import { useLocale } from './LocaleProvider'

export function LocaleSwitcher({ light }: { light?: boolean }) {
  const { locale, setLocale } = useLocale()

  const activeColor = light ? 'white' : '#111'
  const idleColor = light ? 'rgba(255,255,255,0.6)' : '#999'
  const dividerColor = light ? 'rgba(255,255,255,0.45)' : '#ccc'

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
          color: locale === 'fr' ? activeColor : idleColor,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0',
          transition: 'color 0.2s',
        }}>
        FR
      </button>
      <span style={{ color: dividerColor, fontSize: '0.7rem' }}>|</span>
      <button
        onClick={() => setLocale('en')}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          fontWeight: locale === 'en' ? 700 : 400,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: locale === 'en' ? activeColor : idleColor,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0',
          transition: 'color 0.2s',
        }}>
        EN
      </button>
    </div>
  )
}
