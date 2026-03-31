import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Services de photographie, développement web, design et infographie — Stéphane Sayeb, Tahiti Zoom.',
}

export default function ServicesPage() {
  return (
    <div style={{ background: 'white', color: '#111', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '6rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem',
            letterSpacing: '0.35em', textTransform: 'uppercase', color: '#999', marginBottom: '1rem' }}>
            Ce que je propose
          </p>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(3rem,8vw,7rem)',
            fontWeight: 300, textTransform: 'uppercase', lineHeight: 0.9,
            letterSpacing: '0.03em', marginBottom: '2rem' }}>
            SERVICES
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem',
            color: '#777', maxWidth: '600px', lineHeight: '1.7' }}>
            Photographe reporter et développeur full stack basé en Polynésie française,
            je vous accompagne dans vos projets visuels et digitaux.
          </p>
        </div>
      </section>

      {/* Service 01 — Photographie */}
      <section style={{ padding: '6rem 2rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '6rem', alignItems: 'start' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem',
              letterSpacing: '0.2em', color: '#ccc', marginBottom: '1rem' }}>/01</p>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)',
              fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111' }}>
              Photographie
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem',
              color: '#555', lineHeight: '1.8', marginBottom: '3rem' }}>
              Avec plus de 30 ans d'expérience en Polynésie française, je capture l'essence du Fenua —
              ses gens, sa culture, ses paysages. Mon regard documentaire et humain s'adapte à tous vos projets,
              du reportage de presse à la commande corporate.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              {[
                { t: 'Reportage documentaire', d: 'Immersion dans la culture polynésienne, événements sociaux et culturels.' },
                { t: 'Portrait', d: 'Portraits individuels, familiaux et corporate en studio ou en extérieur.' },
                { t: 'Événementiel', d: 'Mariages, cérémonies, conférences, soirées d\'entreprise.' },
                { t: 'Photojournalisme', d: 'Couverture presse, illustrations éditoriales pour médias.' },
                { t: 'Location de studio', d: 'Studio photo équipé disponible à la location à Faaa.' },
                { t: 'Photographie aérienne', d: 'Vues drone pour immobilier, tourisme et publicité.' },
              ].map((s) => (
                <div key={s.t} style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1.2rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    fontWeight: 600, color: '#111', marginBottom: '0.4rem' }}>{s.t}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    color: '#888', lineHeight: '1.5' }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service 02 — Développement */}
      <section style={{ padding: '6rem 2rem', borderBottom: '1px solid rgba(0,0,0,0.08)', background: '#fafafa' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '6rem', alignItems: 'start' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem',
              letterSpacing: '0.2em', color: '#ccc', marginBottom: '1rem' }}>/02</p>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)',
              fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111' }}>
              Développement
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem',
              color: '#555', lineHeight: '1.8', marginBottom: '3rem' }}>
              Développeur full stack spécialisé Next.js et Payload CMS, je conçois des applications web
              performantes, élégantes et sur mesure. De la landing page au CMS complexe,
              je gère l'ensemble du cycle de développement.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              {[
                { t: 'Sites web sur mesure', d: 'Next.js, React, TypeScript — interfaces modernes et performantes.' },
                { t: 'CMS Payload', d: 'Administration de contenu sur mesure, collections et globals personnalisés.' },
                { t: 'Applications web', d: 'APIs REST, back-end Node.js, bases de données SQLite / PostgreSQL.' },
                { t: 'Hébergement', d: 'Déploiement sur infrastructure propre Proxmox ou cloud, avec Cloudflare.' },
                { t: 'Maintenance', d: 'Suivi, mises à jour, optimisations et support technique continu.' },
                { t: 'E-commerce', d: 'Boutiques en ligne, systèmes de paiement et gestion des commandes.' },
              ].map((s) => (
                <div key={s.t} style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1.2rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    fontWeight: 600, color: '#111', marginBottom: '0.4rem' }}>{s.t}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    color: '#888', lineHeight: '1.5' }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service 03 — Web Design */}
      <section style={{ padding: '6rem 2rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '6rem', alignItems: 'start' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem',
              letterSpacing: '0.2em', color: '#ccc', marginBottom: '1rem' }}>/03</p>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)',
              fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111' }}>
              Web Design
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem',
              color: '#555', lineHeight: '1.8', marginBottom: '3rem' }}>
              L'esthétique au service de l'expérience utilisateur. Je conçois des interfaces
              qui allient élégance visuelle et efficacité fonctionnelle,
              en m'inspirant des meilleures pratiques du design contemporain.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              {[
                { t: 'UI / UX Design', d: 'Conception d\'interfaces intuitives et agréables à utiliser.' },
                { t: 'Maquettes Figma', d: 'Prototypes interactifs et maquettes haute fidélité.' },
                { t: 'Design system', d: 'Systèmes de composants cohérents et réutilisables.' },
                { t: 'Responsive design', d: 'Interfaces adaptées à tous les écrans, mobile first.' },
                { t: 'Motion design', d: 'Animations et transitions pour enrichir l\'expérience.' },
                { t: 'Refonte visuelle', d: 'Modernisation d\'interfaces existantes.' },
              ].map((s) => (
                <div key={s.t} style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1.2rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    fontWeight: 600, color: '#111', marginBottom: '0.4rem' }}>{s.t}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    color: '#888', lineHeight: '1.5' }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service 04 — Infographie */}
      <section style={{ padding: '6rem 2rem', borderBottom: '1px solid rgba(0,0,0,0.08)', background: '#fafafa' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '6rem', alignItems: 'start' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem',
              letterSpacing: '0.2em', color: '#ccc', marginBottom: '1rem' }}>/04</p>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)',
              fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111' }}>
              Infographie
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem',
              color: '#555', lineHeight: '1.8', marginBottom: '3rem' }}>
              De l'identité visuelle aux supports print, je crée des visuels qui racontent
              votre histoire et renforcent votre image de marque.
              Un œil photographique au service de la communication visuelle.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              {[
                { t: 'Identité visuelle', d: 'Logo, charte graphique, déclinaisons print et digital.' },
                { t: 'Supports print', d: 'Affiches, flyers, brochures, cartes de visite.' },
                { t: 'Réseaux sociaux', d: 'Visuels et templates pour Facebook, Instagram.' },
                { t: 'Retouche photo', d: 'Post-traitement professionnel Lightroom et Photoshop.' },
                { t: 'Mise en page', d: 'Livres, catalogues, rapports annuels, magazines.' },
                { t: 'Signalétique', d: 'Panneaux, bâches, kakémonos et affichage grand format.' },
              ].map((s) => (
                <div key={s.t} style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1.2rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    fontWeight: 600, color: '#111', marginBottom: '0.4rem' }}>{s.t}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    color: '#888', lineHeight: '1.5' }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.5rem,3vw,2.5rem)',
            fontWeight: 300, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            Un projet en tête ?
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem',
            color: '#777', lineHeight: '1.7', marginBottom: '2.5rem' }}>
            Discutons de votre projet ensemble. Je vous réponds rapidement.
          </p>
          <Link href="/contact" style={{
            fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.3em',
            textTransform: 'uppercase', border: '1px solid #111', padding: '1rem 3rem',
            color: '#111', textDecoration: 'none', display: 'inline-block' }}
            className="hover:bg-black hover:text-white transition-all duration-300">
            Me contacter →
          </Link>
        </div>
      </section>

    </div>
  )
}
