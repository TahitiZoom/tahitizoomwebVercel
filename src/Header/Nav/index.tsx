'use client'
import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { useLocale } from '@/components/LocaleProvider'

const translations: Record<string, Record<string, string>> = {
  'Éditorial': { fr: 'Univers',   en: 'Universe'  },
  'Editorial': { fr: 'Univers',   en: 'Universe'  },
  'Services':  { fr: 'Expertise', en: 'Expertise' },
  'À propos':  { fr: 'Agence',    en: 'Agency'    },
  'Contact':   { fr: 'Contact',   en: 'Contact'   },
}

const baseNavStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '1.05rem',
  fontWeight: 400,
  letterSpacing: '0.02em',
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

export const HeaderNav: React.FC<{ data: HeaderType; mobile?: boolean; light?: boolean }> = ({
  data,
  mobile,
  light,
}) => {
  const navItems = data?.navItems || []
  const { locale } = useLocale()

  const navStyle = { ...baseNavStyle, color: light ? 'white' : '#111' }

  if (mobile) return (
    <nav className={light ? 'mobile-nav mobile-nav--light' : 'mobile-nav'}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {navItems.map(({ link }, i) => {
        const label = link.label || ''
        const translated = translations[label]?.[locale] || label
        return (
          <span key={i} style={{ ...navStyle, fontSize: '1.1rem' }}>
            <CMSLink {...link} label={translated} appearance="inline" />
          </span>
        )
      })}
      <LocaleSwitcher light={light} />
    </nav>
  )

  return (
    <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
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
        <LocaleSwitcher light={light} />
      </div>
    </nav>
  )
}
