import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Stéphane Sayeb — Reporter photographe et développeur full stack en Polynésie française.',
}

export default function ContactPage() {
  return (
    <div style={{ background: 'white', color: '#111', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ paddingTop: '100px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 0' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem',
            letterSpacing: '0.35em', textTransform: 'uppercase', color: '#999', marginBottom: '1rem' }}>
            Travaillons ensemble
          </p>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2rem,5vw,4.5rem)',
            fontWeight: 300, textTransform: 'uppercase', lineHeight: 0.9,
            letterSpacing: '0.03em', marginBottom: '3rem' }}>
            VOTRE PROJET<br />COMMENCE ICI
          </h1>
        </div>

        {/* Photo pleine largeur */}
        <div style={{ position: 'relative', width: '100%', height: '60vh', overflow: 'hidden' }}>
          <img src="/images/contact-hero.jpg" alt="Contact"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)' }} />
          {/* Crédit photo */}
          <div style={{
            position: 'absolute', bottom: '1rem', right: '1rem',
            writingMode: 'vertical-rl', textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            fontFamily: 'var(--font-body)', fontSize: '0.6rem',
            letterSpacing: '0.15em', color: 'rgba(255,255,255,0.6)',
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          }}>
            © Ludovic Chan
          </div>
        </div>
      </section>

      {/* Formulaire + infos */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem' }}>

          {/* Infos contact */}
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.35em',
              textTransform: 'uppercase', color: '#999', marginBottom: '3rem' }}>
              Coordonnées
            </p>
            {[
              { label: 'Email', value: 'contact@tahitizoom.pf', href: 'mailto:contact@tahitizoom.pf' },
              { label: 'Localisation', value: 'Faaa, Tahiti — Polynésie française', href: null },
              { label: 'Facebook', value: 'facebook.com/TahitiZoom', href: 'https://facebook.com/TahitiZoom' },
              { label: 'Instagram', value: '@tahitizoom', href: 'https://instagram.com/tahitizoom' },
            ].map((item) => (
              <div key={item.label} style={{ padding: '1.5rem 0', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase', color: '#bbb', marginBottom: '0.4rem' }}>
                  {item.label}
                </p>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#111',
                      textDecoration: 'none' }}
                    className="hover:opacity-60 transition-opacity">
                    {item.value}
                  </a>
                ) : (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#111' }}>
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Formulaire */}
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.35em',
              textTransform: 'uppercase', color: '#999', marginBottom: '3rem' }}>
              Envoyez un message
            </p>
            <form action="/api/contact" method="POST"
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { name: 'name',    label: 'Nom', type: 'text',  placeholder: 'Votre nom' },
                { name: 'email',   label: 'Email', type: 'email', placeholder: 'votre@email.com' },
                { name: 'subject', label: 'Sujet', type: 'text',  placeholder: 'Objet de votre message' },
              ].map((field) => (
                <div key={field.name}>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999',
                    display: 'block', marginBottom: '0.5rem' }}>
                    {field.label}
                  </label>
                  <input type={field.type} name={field.name} placeholder={field.placeholder}
                    style={{ width: '100%', padding: '0.8rem 0',
                      fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#111',
                      background: 'transparent', border: 'none',
                      borderBottom: '1px solid rgba(0,0,0,0.15)', outline: 'none',
                      boxSizing: 'border-box' }} />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999',
                  display: 'block', marginBottom: '0.5rem' }}>
                  Message
                </label>
                <textarea name="message" placeholder="Décrivez votre projet..." rows={5}
                  style={{ width: '100%', padding: '0.8rem 0',
                    fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#111',
                    background: 'transparent', border: 'none', resize: 'vertical',
                    borderBottom: '1px solid rgba(0,0,0,0.15)', outline: 'none',
                    boxSizing: 'border-box' }} />
              </div>
              <button type="submit"
                style={{ alignSelf: 'flex-start', marginTop: '1rem',
                  fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                  letterSpacing: '0.3em', textTransform: 'uppercase',
                  border: '1px solid #111', padding: '0.9rem 2.5rem',
                  background: 'transparent', color: '#111', cursor: 'pointer' }}
                className="hover:bg-black hover:text-white transition-all duration-300">
                Envoyer →
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  )
}
