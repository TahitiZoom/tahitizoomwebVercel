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
    tagline: {
      fr: 'Reporter photographe & développeur full stack en Polynésie française.',
      en: 'Photojournalist & full stack developer in French Polynesia.',
    },
    navigation: { fr: 'Navigation', en: 'Navigation' },
    contact: { fr: 'Contact', en: 'Contact' },
    location: { fr: 'Faa\'a, Tahiti, Polynésie française', en: 'Faa\'a, Tahiti, French Polynesia' },
    copyright: {
      fr: `© ${new Date().getFullYear()} Tahiti Zoom, Made with love by Stéphane Sayeb`,
      en: `© ${new Date().getFullYear()} Tahiti Zoom, Made with love by Stéphane Sayeb`,
    },
    legal: { fr: 'Mentions légales', en: 'Legal Notice' },
    privacy: { fr: 'Confidentialité', en: 'Privacy' },
  }

  return (
    <footer style={{ background: 'var(--tz-bg)', borderTop: '1px solid var(--tz-line)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem 2rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem', marginBottom: '4rem' }}>

          {/* Wordmark + description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500,
                fontSize: '1rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--tz-paper)' }}>
                Tahiti&nbsp;Zoom<span style={{ color: 'var(--tz-accent)' }}>®</span>
              </span>
            </Link>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem',
              color: 'var(--tz-paper-dim)', lineHeight: '1.6', maxWidth: '220px' }}>
              {t.tagline[locale]}
            </p>
            <div style={{ display: 'flex', gap: '1.4rem', marginTop: '0.5rem' }}>
              {[
                { href: 'https://facebook.com/TahitiZoom', label: 'Facebook' },
                { href: 'https://instagram.com/tahitizoom', label: 'Instagram' },
                { href: 'https://linkedin.com/in/tahitizoom', label: 'LinkedIn' },
              ].map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'var(--tz-paper-dim)', textDecoration: 'none',
                    borderBottom: '1px solid var(--tz-line)', paddingBottom: '2px',
                    transition: 'color 0.2s, border-color 0.2s' }}
                  className="hover:text-white">
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="tz-chip" style={{ marginBottom: '1.2rem' }}>{t.navigation[locale]}</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {navItems.map(({ link }, i) => {
                const label = link.label || ''
                const translated = navTranslations[label]?.[locale] || label
                return (
                  <span key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    color: 'var(--tz-paper-dim)' }}>
                    <CMSLink {...link} label={translated} />
                  </span>
                )
              })}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="tz-chip" style={{ marginBottom: '1.2rem' }}>{t.contact[locale]}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <a href="mailto:contact@tahitizoom.pf"
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                  color: 'var(--tz-paper-dim)', textDecoration: 'none' }}
                className="hover:text-white transition-colors">
                contact@tahitizoom.pf
              </a>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                color: 'var(--tz-paper-faint)' }}>
                {t.location[locale]}
              </p>
            </div>
          </div>

        </div>

        {/* Grand wordmark éditorial */}
        <div aria-hidden="true" style={{ overflow: 'hidden', marginBottom: '2rem' }}>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 300,
            fontSize: 'clamp(3rem,11vw,10rem)', lineHeight: 0.9, textTransform: 'uppercase',
            letterSpacing: '0.02em', color: 'var(--tz-paper)', opacity: 0.08,
            whiteSpace: 'nowrap', margin: 0 }}>
            Tahiti Zoom
          </p>
        </div>

        {/* Bas de page */}
        <div style={{ borderTop: '1px solid var(--tz-line)', paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem',
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--tz-paper-faint)' }}>
            {t.copyright[locale]}
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/mentions-legales"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--tz-paper-faint)', textDecoration: 'none' }}
              className="hover:text-white transition-colors">
              {t.legal[locale]}
            </Link>
            <Link href="/confidentialite"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--tz-paper-faint)', textDecoration: 'none' }}
              className="hover:text-white transition-colors">
              {t.privacy[locale]}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
