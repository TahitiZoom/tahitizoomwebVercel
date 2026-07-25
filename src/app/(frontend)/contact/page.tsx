'use client'
import { useLocale } from '@/components/LocaleProvider'
import { ContactForm } from '@/components/ContactForm'

export default function ContactPage() {
  const { t } = useLocale()

  return (
    <div style={{ background: 'var(--tz-sand)', color: 'var(--tz-ink)', minHeight: '100vh' }}>
      <section style={{ paddingTop: '100px',
        background: 'linear-gradient(180deg, var(--tz-frangipani-soft) 0%, var(--tz-sand) 100%)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <p className="tz-chip" style={{ background: 'var(--tz-frangipani-soft)',
            color: 'var(--tz-frangipani-deep)', marginBottom: '1.5rem' }}>
            {t('contact.subtitle')}
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,5.5rem)',
            fontWeight: 400, textTransform: 'uppercase', lineHeight: 0.95,
            letterSpacing: '0.03em', marginBottom: '3rem', whiteSpace: 'pre-line', color: 'var(--tz-ink)' }}>
            {t('contact.title')}
          </h1>
        </div>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 3rem' }}>
          <div style={{ position: 'relative', width: '100%', borderRadius: '2rem', overflow: 'hidden',
            background: 'var(--tz-lagoon-soft)', display: 'flex', justifyContent: 'center' }}>
            <img src="/images/contact-hero.webp" alt="Contact"
              style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }} />
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem',
              writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)',
              fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.7)', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
              © Ludovic Chan
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem 6rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
          <div>
            <p className="tz-chip" style={{ marginBottom: '2.5rem' }}>
              {t('contact.coordinates')}
            </p>
            {[
              { label: 'Email', value: 'contact@tahitizoom.pf', href: 'mailto:contact@tahitizoom.pf', color: 'var(--tz-coral-deep)' },
              { label: 'Localisation', value: 'Faaa, Tahiti, Polynésie française', href: null, color: 'var(--tz-lagoon-deep)' },
              { label: 'Facebook', value: 'facebook.com/TahitiZoom', href: 'https://facebook.com/TahitiZoom', color: 'var(--tz-lilac-deep)' },
              { label: 'Instagram', value: '@tahitizoom', href: 'https://instagram.com/tahitizoom', color: 'var(--tz-hibiscus-deep)' },
            ].map((item) => (
              <div key={item.label} style={{ background: 'var(--tz-cream)', borderRadius: '1.25rem',
                padding: '1.3rem 1.5rem', marginBottom: '1rem', boxShadow: '0 3px 12px rgba(30,66,73,0.06)' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase', color: item.color, marginBottom: '0.4rem' }}>
                  {item.label}
                </p>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--tz-ink)', textDecoration: 'none' }}>
                    {item.value}
                  </a>
                ) : (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--tz-ink)' }}>
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--tz-cream)', borderRadius: '2rem',
            padding: 'clamp(1.5rem,3vw,2.5rem)', boxShadow: '0 6px 24px rgba(30,66,73,0.08)' }}>
            <p className="tz-chip" style={{ background: 'var(--tz-coral-soft)',
              color: 'var(--tz-coral-deep)', marginBottom: '2.5rem' }}>
              {t('contact.send_message')}
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
