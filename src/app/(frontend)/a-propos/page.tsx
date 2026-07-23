'use client'
import Link from 'next/link'
import { useLocale } from '@/components/LocaleProvider'

export default function AProposPage() {
  const { t, locale } = useLocale()

  const content = {
    fr: {
      quote:
        "Il n'est pas toujours évident de ne pas attacher de valeur morale aux événements, rester factuel et objectif, parce que tombé amoureux il y a plus de 50 ans de ce si attachant fenua et de son peuple, le Nuna'a, reste un challenge pour moi, photographe documentaire et éditorial.",
      intro: [
        "Né en 1960 à Argenteuil, de parents franco-arabes, j'ai grandi entre deux rives avant de choisir la plus lointaine, Tahiti, à la fin des années soixante-dix. C'est là, dans les ateliers culturels de mon lycée, que j'ai posé les yeux sur un viseur pour la première fois. Ce geste ne m'a plus quitté.",
      ],
      sections: [
        {
          title: "L'Œil",
          paragraphs: [
            "Papeete m'a appris le tempo. Celui des marchés à l'aube, des vieux quartiers qui respirent lentement, des visages que l'on croise une fois et que l'on n'oublie plus. Je me suis fondu dans ce flot comme on entre dans un morceau de jazz, sans partition, juste à l'écoute.",
            "D'abord sur Fuji, puis sur Leica, je suis devenu photographe de rue. La couleur Velvia est mon langage, une saturation de vivre, une façon de dire que la lumière polynésienne ne se laisse pas dompter, elle se négocie. Mon œuvre oscille entre deux pôles : l'anecdote narrative des scènes de rue de Papeete, et l'épure picturale des paysages de Moorea et Tahiti, où je ne retiens que la vibration de la lumière.",
            "Grand témoin de mon époque, je photographie chaque année les festivités du Tiurai, ce juillet polynésien qui embrase le Fenua, autant que les servitudes silencieuses des bas quartiers, les artisans traditionnels à l'œuvre, les visages que l'histoire ne retient jamais. En 2014, après une retraite anticipée, je me suis lancé en free-lance. Non pas comme une rupture, mais comme un aboutissement.",
          ],
        },
        {
          title: 'Le Code',
          paragraphs: [
            "L'informatique est entrée dans ma vie par une autre porte, celle de l'université Saint-Charles de Marseille, où j'ai étudié la programmation. Deux disciplines en apparence opposées, mais qui partagent la même exigence : la précision du geste, la patience de la composition, l'œil qui sait où poser le point.",
            "Aujourd'hui, sous la marque Tahiti Zoom, je conçois et développe des expériences web, de l'architecture technique à l'interface, avec la même rigueur que j'apporte à une prise de vue. Parce qu'un site bien construit, comme une bonne photographie, ne se remarque pas. Il se ressent.",
          ],
        },
        {
          title: 'Entre deux rives',
          paragraphs: [
            'Je partage ma vie entre Tahiti et la France, fidèle à moi-même : entre témoignage et contemplation, entre le code et la lumière, entre le bruit vivant des rues de Papeete et le silence habité des lagons de Moorea.',
            'Toujours au bord de quelque chose.',
          ],
        },
      ],
    },
    en: {
      quote:
        "It is not always easy to avoid attaching moral value to events, staying factual and objective. Having fallen in love more than 50 years ago with this deeply endearing fenua and its people, the Nuna'a, remains an ongoing challenge for me as a documentary and editorial photographer.",
      intro: [
        'Born in 1960 in Argenteuil to Franco-Arab parents, I grew up between two shores before choosing the farthest one, Tahiti, in the late seventies. There, in my high school cultural workshops, I looked through a viewfinder for the first time. That gesture has never left me.',
      ],
      sections: [
        {
          title: 'The Eye',
          paragraphs: [
            "Papeete taught me rhythm: dawn markets, old neighborhoods that breathe slowly, faces you meet once and never forget. I blended into that flow the way one enters a jazz piece, without score, simply listening.",
            "First with Fuji, then Leica, I became a street photographer. Velvia color is my language, a saturation of life, a way of saying Polynesian light cannot be controlled; it must be negotiated. My work moves between two poles: the narrative anecdote of Papeete street scenes, and the pictorial purity of Moorea and Tahiti landscapes, where I keep only the vibration of light.",
            'A witness to my era, I photograph each year the Tiurai celebrations, Polynesian July set ablaze across the Fenua, as well as the silent burdens of working-class districts, traditional artisans at work, and faces history never keeps. In 2014, after early retirement, I started freelancing. Not as a break, but as an achievement.',
          ],
        },
        {
          title: 'The Code',
          paragraphs: [
            'Computing entered my life through another door, Saint-Charles University in Marseille, where I studied programming. Two disciplines that seem opposite, yet share the same demand: precision of gesture, patience in composition, and an eye that knows where to place focus.',
            'Today, under the Tahiti Zoom name, I design and build web experiences, from technical architecture to interface, with the same rigor I bring to photography. Because a well-built website, like a good photograph, does not call attention to itself. It is felt.',
          ],
        },
        {
          title: 'Between two shores',
          paragraphs: [
            'I share my life between Tahiti and France, true to myself: between testimony and contemplation, between code and light, between the vivid noise of Papeete streets and the inhabited silence of Moorea lagoons.',
            'Always on the edge of something.',
          ],
        },
      ],
    },
  }
  const localeKey = locale === 'en' ? 'en' : 'fr'
  const currentContent = content[localeKey]

  return (
    <div style={{ background: 'white', color: '#111', minHeight: '100vh' }}>
      <section style={{ paddingTop: '120px', paddingBottom: '6rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          <div style={{ position: 'relative' }}>
            <img src="/images/portrait-stephane.webp" alt="Stéphane Sayeb"
              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '4px', filter: 'grayscale(20%)' }} />
            <div style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem',
              background: 'white', padding: '1rem 1.5rem', border: '1px solid rgba(0,0,0,0.08)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999' }}>
                {t('about.location')}
              </p>
            </div>
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem',
              writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)',
              fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.6)', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
              © Kevin Manhein
            </div>
          </div>

          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem',
              letterSpacing: '0.35em', textTransform: 'uppercase', color: '#999', marginBottom: '1.5rem' }}>
              {t('about.subtitle')}
            </p>
            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem,5vw,4rem)',
              fontWeight: 300, textTransform: 'uppercase', lineHeight: 1.0,
              letterSpacing: '0.03em', marginBottom: '2.5rem' }}>
              Stéphane<br />Sayeb
            </h1>
            <blockquote style={{ margin: 0, borderLeft: '2px solid rgba(0,0,0,0.2)', paddingLeft: '1rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: '1.8', color: '#555' }}>
                « {currentContent.quote} »
              </p>
            </blockquote>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem',
              lineHeight: '1.8', color: '#555', display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1.5rem' }}>
              {currentContent.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
              <Link href="/editorial" style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                letterSpacing: '0.3em', textTransform: 'uppercase', border: '1px solid #111',
                padding: '0.8rem 2rem', color: '#111', textDecoration: 'none' }}>
                {t('about.see_editorial')}
              </Link>
              <Link href="/contact" style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                letterSpacing: '0.3em', textTransform: 'uppercase', color: '#999',
                textDecoration: 'none', alignSelf: 'center' }}>
                {t('about.contact')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gap: '4rem' }}>
          {currentContent.sections.map((section) => (
            <div key={section.title} style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '2rem' }}>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.4rem,2.5vw,2rem)',
                fontWeight: 300, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                {section.title}
              </h2>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: '1.9', color: '#555',
                display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '1000px' }}>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
