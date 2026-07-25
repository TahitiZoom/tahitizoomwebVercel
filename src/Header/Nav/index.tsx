'use client'
import React from 'react'
import Link from 'next/link'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { useLocale } from '@/components/LocaleProvider'

const translations: Record<string, Record<string, string>> = {
  'Éditorial': { fr: 'Éditorial', en: 'Editorial' },
  'Editorial': { fr: 'Éditorial', en: 'Editorial' },
  'Services':  { fr: 'Services',  en: 'Services'  },
  'À propos':  { fr: 'À propos',  en: 'About'     },
  'Contact':   { fr: 'Contact',   en: 'Contact'   },
}

const navStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '1.05rem',
  fontWeight: 400,
  letterSpacing: '0.02em',
  color: '#111',
  textDecoration: 'none',
}

/* Libellé dupliqué dans un masque : au survol il roule vers le haut
   pendant que sa copie entre par le bas. */
const RollLabel: React.FC<{ text: string }> = ({ text }) => (
  <span className="tz-roll">
    <span className="tz-roll__inner">
      <span className="tz-roll__line">{text}</span>
      <span className="tz-roll__line" aria-hidden="true">{text}</span>
    </span>
  </span>
)

export const HeaderNav: React.FC<{ data: HeaderType; mobile?: boolean }> = ({ data, mobile }) => {
  const navItems = data?.navItems || []
  const { locale } = useLocale()

  const homeLabel = locale === 'en' ? 'Home' : 'Accueil'

  if (mobile) return (
    <nav className="mobile-nav" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <span style={{ ...navStyle, fontSize: '1.1rem' }}>
        <Link href="/">{homeLabel}</Link>
      </span>
      {navItems.map(({ link }, i) => {
        const label = link.label || ''
        const translated = translations[label]?.[locale] || label
        return (
          <span key={i} style={{ ...navStyle, fontSize: '1.1rem' }}>
            <CMSLink {...link} label={translated} appearance="inline" />
          </span>
        )
      })}
      <LocaleSwitcher />
    </nav>
  )

  return (
    <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
      <span className="tz-nav-item" style={navStyle}>
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <RollLabel text={homeLabel} />
        </Link>
      </span>
      {navItems.map(({ link }, i) => {
        const label = link.label || ''
        const translated = translations[label]?.[locale] || label
        return (
          <span key={i} className="tz-nav-item" style={navStyle}>
            <CMSLink {...link} label={null} appearance="inline">
              <RollLabel text={translated} />
            </CMSLink>
          </span>
        )
      })}
      <div style={{ marginTop: '0.3rem' }}>
        <LocaleSwitcher />
      </div>
    </nav>
  )
}
