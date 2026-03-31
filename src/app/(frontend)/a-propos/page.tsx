import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Stéphane Sayeb — Reporter photographe et développeur full stack basé en Polynésie française.',
}

export default function AProposPage() {
  return (
    <div style={{ background: 'white', color: '#111', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '6rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>

          <div style={{ position: 'relative' }}>
            <img src="/images/portrait-stephane.jpg" alt="Stéphane Sayeb"
              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover',
                borderRadius: '4px', filter: 'grayscale(20%)' }} />
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)', fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.6)', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
              © Kevin Manhein
            </div>
            <div style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem',
              background: 'white', padding: '1rem 1.5rem', border: '1px solid rgba(0,0,0,0.08)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999' }}>
                Faaa, Polynésie française
              </p>
            </div>
          </div>

          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem',
              letterSpacing: '0.35em', textTransform: 'uppercase', color: '#999', marginBottom: '1.5rem' }}>
              Reporter Photographe · Développeur Full Stack
            </p>
            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem,5vw,4rem)',
              fontWeight: 300, textTransform: 'uppercase', lineHeight: 1.0,
              letterSpacing: '0.03em', marginBottom: '2.5rem' }}>
              Stéphane<br />Sayeb
            </h1>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem',
              lineHeight: '1.8', color: '#555', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <p>
                Installé à Faaa depuis de nombreuses années, je suis photographe reporter et développeur full stack.
                Deux métiers en apparence opposés, mais qui partagent la même exigence : l'attention au détail,
                la précision du geste et la recherche de sens.
              </p>
              <p>
                Mon objectif se pose sur la Polynésie et son peuple avec un regard tendre et authentique.
                Marchés du matin, cérémonies culturelles, portraits volés, instants de vie —
                je documente le Fenua tel qu'il est, dans toute sa beauté brute et humaine.
              </p>
              <p>
                En parallèle, je conçois des applications web et des interfaces digitales pour des clients
                qui cherchent à marier la performance technique avec une esthétique soignée.
              </p>
            </div>
            <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
              <Link href="/editorial" style={{
                fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', border: '1px solid #111', padding: '0.8rem 2rem',
                color: '#111', textDecoration: 'none' }}>
                Voir l'éditorial
              </Link>
              <Link href="/contact" style={{
                fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: '#999', textDecoration: 'none',
                alignSelf: 'center' }}>
                Me contacter →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Compétences */}
      <section style={{ padding: '6rem 2rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.35em',
            textTransform: 'uppercase', color: '#999', marginBottom: '4rem' }}>
            Compétences
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
            {[
              { t: 'Photographie', items: ['Reportage documentaire', 'Portrait', 'Événementiel', 'Photojournalisme', 'Post-traitement'] },
              { t: 'Développement', items: ['Next.js / React', 'Node.js / TypeScript', 'Payload CMS', 'SQLite / Turso', 'Déploiement Proxmox / Cloudflare'] },
              { t: 'Design', items: ['UI/UX Design', 'Identité visuelle', 'Typographie', 'Figma', 'Motion design'] },
            ].map((cat) => (
              <div key={cat.t}>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.2rem',
                  fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.08em',
                  marginBottom: '1.5rem', color: '#111' }}>{cat.t}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0,
                  display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {cat.items.map((item) => (
                    <li key={item} style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                      color: '#777', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ width: '20px', height: '1px', background: '#ccc', flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parcours */}
      <section style={{ padding: '6rem 2rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.35em',
            textTransform: 'uppercase', color: '#999', marginBottom: '4rem' }}>
            Parcours
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { year: '2024 —', title: 'Développeur Full Stack indépendant', desc: 'Conception et développement de sites et applications web sur mesure pour clients locaux et internationaux.' },
              { year: '2015 —', title: 'Photographe reporter indépendant', desc: 'Reportages documentaires en Polynésie française. Collaborations avec médias locaux et publications internationales.' },
              { year: '1995 —', title: 'Résident permanent en Polynésie française', desc: "Installé définitivement à Tahiti depuis 1995, après une première découverte du Fenua à la fin des années 70. Une terre d'adoption devenue source d'inspiration permanente." },
            ].map((item, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1fr',
                gap: '2rem', padding: '2rem 0', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem',
                  letterSpacing: '0.15em', color: '#bbb', paddingTop: '0.2rem' }}>{item.year}</span>
                <div>
                  <h4 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.1rem',
                    fontWeight: 400, marginBottom: '0.5rem', color: '#111' }}>{item.title}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                    color: '#777', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipements */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.35em',
            textTransform: 'uppercase', color: '#999', marginBottom: '4rem' }}>
            Équipements
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {[
              { cat: 'Boîtiers', items: ['Fujifilm X-T3', 'Leica Q3 43'] },
              { cat: 'Optiques', items: ['Fish-eye 8mm', 'Gamme complète jusqu\'au 400mm'] },
              { cat: 'Éclairage', items: ['Flashs Godox studio', 'Flashs Cobra', 'Softbox', 'Location de studio photo'] },
              { cat: 'Post-production', items: ['Adobe Lightroom Classic', 'Adobe Photoshop'] },
            ].map((cat) => (
              <div key={cat.cat} style={{ padding: '2rem', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '4px' }}>
                <h4 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.9rem',
                  fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.1em',
                  marginBottom: '1.2rem', color: '#111' }}>{cat.cat}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0,
                  display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {cat.items.map((item) => (
                    <li key={item} style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#777' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
