'use client'
import Link from 'next/link'
import { useLocale } from './LocaleProvider'
import { CMSLink } from './Link'

const navTranslations: Record<string, Record<string, string>> = {
  'Éditorial': { fr: 'Éditorial', en: 'Editorial' },
  'Editorial': { fr: 'Éditorial', en: 'Editorial' },
  'Services':  { fr: 'Services',  en: 'Services'  },
  'À propos':  { fr: 'À propos',  en: 'About'     },
  'Contact':   { fr: 'Contact',   en: 'Contact'   },
  'Admin':     { fr: 'Admin',     en: 'Admin'      },
}

export function FooterClient({ navItems }: { navItems: any[] }) {
  const { locale } = useLocale()

  const t = {
    navigation: { fr: 'Navigation', en: 'Navigation' },
    expertises: { fr: 'Expertises', en: 'Expertise' },
    expList: {
      fr: ['Reportage & documentaire', 'Portrait & événementiel', 'Applications métiers'],
      en: ['Reportage & documentary', 'Portrait & events', 'Business applications'],
    },
    location: { fr: 'Faa\'a, Tahiti, Polynésie française', en: 'Faa\'a, Tahiti, French Polynesia' },
    copyright: {
      fr: `© ${new Date().getFullYear()} Tahiti Zoom, Made with love by Stéphane Sayeb`,
      en: `© ${new Date().getFullYear()} Tahiti Zoom, Made with love by Stéphane Sayeb`,
    },
    legal: { fr: 'Mentions légales', en: 'Legal Notice' },
    privacy: { fr: 'Confidentialité', en: 'Privacy' },
  }

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-linka)', fontWeight: 300, fontSize: '0.95rem',
    letterSpacing: '0.04em', color: 'var(--tz-paper-dim)', textDecoration: 'none',
  }

  return (
    <footer style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--tz-line)' }}>
      {/* Photographie estompée en arrière-plan, façon Linka */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/contact-hero.webp" alt="" aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', opacity: 0.22 }} />
      <div style={{ position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(44,41,38,0.92) 0%, rgba(44,41,38,0.65) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1500px', margin: '0 auto',
        padding: '5rem 2rem 2rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem', marginBottom: '4rem' }}>

          {/* Wordmark */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
              <svg width="30" height="22" viewBox="0 0 30 22" fill="none" stroke="var(--tz-paper)" strokeWidth="1.3" aria-hidden="true">
                <rect x="1" y="1" width="28" height="20" />
                <path d="M1 21 L15 7 L29 21" />
                <circle cx="22" cy="7" r="2.5" />
              </svg>
              <span style={{ fontFamily: 'var(--font-linka)', fontWeight: 300,
                fontSize: '1.15rem', letterSpacing: '0.42em', textTransform: 'uppercase',
                color: 'var(--tz-paper)' }}>
                Tahiti&nbsp;Zoom
              </span>
            </Link>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem',
              color: 'var(--tz-paper-dim)', lineHeight: 1.6, maxWidth: '240px' }}>
              {t.location[locale]}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontFamily: 'var(--font-linka)', fontWeight: 400, fontSize: '0.95rem',
              color: 'var(--tz-paper)', marginBottom: '1.2rem' }}>{t.navigation[locale]}</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {navItems.map(({ link }, i) => {
                const label = link.label || ''
                const translated = navTranslations[label]?.[locale] || label
                return (
                  <span key={i} style={linkStyle}>
                    <CMSLink {...link} label={translated} />
                  </span>
                )
              })}
            </nav>
          </div>

          {/* Expertises */}
          <div>
            <p style={{ fontFamily: 'var(--font-linka)', fontWeight: 400, fontSize: '0.95rem',
              color: 'var(--tz-paper)', marginBottom: '1.2rem' }}>{t.expertises[locale]}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {t.expList[locale].map((e) => (
                <Link key={e} href="/services" style={linkStyle} className="hover:text-white transition-colors">
                  {e}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <a href="mailto:contact@tahitizoom.pf"
              style={{ ...linkStyle, color: 'var(--tz-paper)', fontSize: '1.05rem' }}
              className="hover:opacity-70 transition-opacity">
              contact@tahitizoom.pf
            </a>
            <div style={{ display: 'flex', gap: '1.3rem', marginTop: '1.4rem' }}>
              {[
                { href: 'https://facebook.com/TahitiZoom', label: 'Facebook' },
                { href: 'https://instagram.com/tahitizoom', label: 'Instagram' },
                { href: 'https://linkedin.com/in/tahitizoom', label: 'LinkedIn' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ ...linkStyle, fontSize: '0.85rem', borderBottom: '1px solid var(--tz-line)', paddingBottom: '2px' }}
                  className="hover:text-white transition-colors">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bas de page */}
        <div style={{ borderTop: '1px solid var(--tz-line)', paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem',
            letterSpacing: '0.06em', color: 'var(--tz-paper-faint)' }}>
            {t.copyright[locale]}
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/mentions-legales"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem',
                letterSpacing: '0.06em', color: 'var(--tz-paper-faint)', textDecoration: 'none' }}
              className="hover:text-white transition-colors">
              {t.legal[locale]}
            </Link>
            <Link href="/confidentialite"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem',
                letterSpacing: '0.06em', color: 'var(--tz-paper-faint)', textDecoration: 'none' }}
              className="hover:text-white transition-colors">
              {t.privacy[locale]}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
