# Tahiti Zoom — tahitizoom.pf

> **Stéphane Sayeb** — Reporter photographe & Développeur Full Stack  
> Papeete, Polynésie française  
> Contact : contact@tahitizoom.pf

Site portfolio professionnel combinant galerie photographique, vitrine de services et plateforme éditoriale, auto-hébergé sur infrastructure Proxmox LXC.

---

## Stack technique

| Composant | Version | Rôle |
|-----------|---------|------|
| [Next.js](https://nextjs.org) | 16.2.1 | Framework frontend (App Router) |
| [Payload CMS](https://payloadcms.com) | 3.80.0 | Backend CMS headless |
| [Turso](https://turso.tech) (libSQL) | — | Base de données SQLite distante |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Styles utilitaires |
| [shadcn/ui](https://ui.shadcn.com) | — | Composants UI |
| [TypeScript](https://www.typescriptlang.org) | — | Typage statique |
| [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) | — | Exposition HTTPS sans IP fixe |
| [PM2](https://pm2.keymetrics.io) | — | Process manager Node.js |
| [Nodemailer](https://nodemailer.com) | — | Envoi email formulaire contact |

---

## Infrastructure serveur
```
Mac Mini Intel (Macmini8,1 2018, T2) — hostname: tzsrv
└── Proxmox VE 8.x
    ├── LXC 200 — Production  (192.168.1.53) — tahitizoom.pf
    └── LXC 201 — Développement (192.168.1.62) — Debian 12
```

- **Chemin projet** : `/var/www/tahitizoom` (identique sur les deux LXC)
- **Process manager** : PM2, service `tahitizoom`
- **Exposition réseau** : Cloudflare Tunnel `8c941e2c-0eee-43f1-815a-ce69140fb2bd` → `localhost:3000`
- **Accès dev** : VS Code Remote SSH depuis ThinkPad Windows 11 → LXC 201

---

## Architecture du projet
```
src/
├── app/
│   ├── (frontend)/          # Routes publiques Next.js
│   │   ├── page.tsx         # Page d'accueil
│   │   ├── editorial/       # Page éditoriale (posts)
│   │   ├── services/        # Page services
│   │   ├── a-propos/        # Page à propos
│   │   ├── contact/         # Page contact
│   │   ├── mentions-legales/
│   │   ├── confidentialite/
│   │   └── [slug]/          # Pages dynamiques CMS
│   ├── (payload)/           # Admin Payload CMS (/admin)
│   │   └── api/
│   │       ├── sync-facebook/        # Import posts Facebook
│   │       └── update-posts-photos/  # Mise à jour photos posts
│   └── maintenance/         # Page maintenance
├── collections/
│   ├── Posts/               # Collection articles éditoriaux
│   ├── Pages/               # Collection pages CMS
│   ├── Media/               # Collection médias
│   ├── Categories/          # Taxonomie posts
│   └── Users/               # Utilisateurs admin
├── Header/                  # Composant header (nav desktop + mobile)
├── Footer/                  # Composant footer
├── heros/                   # Blocs hero (HighImpact, MediumImpact, etc.)
├── blocks/                  # Blocs de contenu (Banner, Code, Form, etc.)
├── components/              # Composants React réutilisables
│   ├── ClientsCarousel.tsx  # Carousel logos clients
│   ├── EditorialCarousel.tsx # Carousel posts aléatoires (accueil)
│   ├── MasonryGallery.tsx   # Galerie masonry avec lightbox
│   ├── ContactForm.tsx      # Formulaire de contact custom
│   ├── CookieBanner.tsx     # Bandeau cookies RGPD
│   ├── FooterClient.tsx     # Footer client-side
│   ├── LocaleSwitcher.tsx   # Switcher FR/EN
│   ├── ServicesMenu.tsx     # Menu services
│   └── RichText/
│       ├── index.tsx        # RichText standard (avec MediaBlocks)
│       └── withoutMedia.tsx # RichText sans médias (pour masonry)
├── providers/               # Providers React (Theme, Locale, Header)
├── fields/                  # Champs Payload custom
├── hooks/                   # Hooks Payload (revalidation, email)
├── scripts/                 # Scripts utilitaires
│   └── update-posts-photos.ts # Mise à jour photos Facebook
└── migrations/              # Migrations base de données SQLite
```

---

## Collections Payload CMS

### Posts (Éditorial)
Articles publiés sur la page `/editorial`. Champs principaux :
- `title` — Titre de l'article
- `content` — Contenu rich text (Lexical editor avec MediaBlocks)
- `coverImage` — Photo de couverture (vignette carte + image hero)
- `facebookUrl` — Lien vers le post Facebook original
- `facebookId` — ID unique Facebook (pour sync et déduplication)
- `publishedAt` — Date de publication
- `authors` — Auteur(s)
- `categories` — Catégories (relation)
- `meta` — SEO (titre, description, image)

Fonctionnalités : drafts, autosave, versioning (max 50), scheduled publish, live preview.

**Affichage article** :
- Texte du post rendu via `RichTextWithoutMedia`
- Photos extraites et affichées en galerie masonry sous l'article
- Lightbox avec navigation pour visualiser les images en grand

### Pages
Pages CMS avec layout builder. Navigation configurée :
- Home (ID 2) — `/`
- Portfolio (ID 3) — `/portfolio`
- Services (ID 4) — `/services`
- À propos (ID 5) — `/a-propos`
- Contact (ID 1) — `/contact`

### Media
Uploads avec redimensionnement automatique et focal point.

### Categories
Taxonomie pour les posts éditoriaux.

---

## Globals Payload CMS

- **Header** — Liens de navigation (`navItems`)
- **Footer** — Liens footer, réseaux sociaux
- **Paramètres du site** — Mode maintenance (champ `maintenance: boolean`)

---

## Fonctionnalités spécifiques

### Header responsive
- Logo favicon (`Logo-Tahiti-Zoom-144x144.png`) sur mobile
- Logo signature (`logo.png`) sur desktop (`md:` breakpoint)
- Nav desktop masquée sur mobile via classe `.hamburger-mobile` + media query CSS
- Menu déroulant animé sur mobile
- Scroll-aware : ombre au scroll via `useState`

### Internationalisation FR/EN
- `LocaleProvider` et `LocaleSwitcher` custom
- Traductions dans `Nav/index.tsx` via dictionnaire statique
- Langue détectée depuis le navigateur

### Formulaire de contact
Hook custom `sendContactEmail.ts` (Nodemailer + iCloud SMTP) câblé via `formBuilderPlugin` → `formSubmissionOverrides.hooks.afterChange`. Contourne un bug Payload où `"emails":[]` est retourné malgré la config correcte.

### Mode maintenance
Global `Settings` + middleware `proxy.ts` : redirige tout le trafic vers `/maintenance` si activé depuis l'admin.

### Webhook Facebook
Route API à `/facebook-webhook` pour réception future des posts Facebook.

### Bannière cookies RGPD
Composant `CookieBanner.tsx` bilingue FR/EN, consentement persisté en `localStorage`.

### Carousel clients
Composant `ClientsCarousel.tsx` avec logos des clients : RPI, Pilotage Te Ara Tai, Tiki Village, Mairies, CPS, Maison de la Culture, UPF, La 1ère Polynésie, Conservatoire, Radio 1, TNTV.

### Carousel page d'accueil
Composant `EditorialCarousel.tsx` :
- Affiche 20 vignettes aléatoires parmi les posts publiés
- Animation défilement automatique (pause au survol)
- Expansion au hover avec titre et lien "Lire"
- Images mélangées à chaque chargement de page

### Galerie Masonry articles
Composant `MasonryGallery.tsx` :
- Layout masonry adaptatif (2/3/4 colonnes selon viewport)
- Toutes les photos de l'article regroupées en bas (au lieu d'inline)
- Lightbox plein écran au clic avec navigation gauche/droite
- Compteur d'images et fermeture au clic extérieur
- Lazy loading des images

### Synchronisation Facebook
Système complet d'import des posts Facebook vers Payload CMS :

**Route API `/api/sync-facebook`** :
- Import automatique des posts de la Page Facebook
- Téléchargement et création des coverImage
- Génération des slugs SEO-friendly
- Détection des doublons via `facebookId`
- Bouton "Synchro Facebook" dans l'admin Payload

**Script `src/scripts/update-posts-photos.ts`** :
- Récupère les photos supplémentaires de chaque post Facebook
- Télécharge et crée les médias dans Payload
- Ajoute les MediaBlocks au contenu Lexical
- Usage : `npx tsx src/scripts/update-posts-photos.ts`

**Route API `/api/update-posts-photos`** :
- Version API du script ci-dessus (nécessite authentification)
- Endpoint POST pour mise à jour des photos

---

## Configuration email (SMTP iCloud+)
```env
SMTP_HOST=smtp.mail.me.com
SMTP_PORT=587
SMTP_USER=ssayeb@icloud.com        # Apple ID (pas l'alias domaine)
SMTP_PASS=<app-specific-password>
SMTP_FROM=contact@tahitizoom.pf
```

> ⚠️ `SMTP_USER` doit être l'Apple ID, pas l'alias `contact@tahitizoom.pf`

---

## Variables d'environnement
```env
# Base de données Turso (libSQL)
DATABASE_URI=libsql://...turso.io
DATABASE_AUTH_TOKEN=<token>

# Payload
PAYLOAD_SECRET=<secret>
NEXT_PUBLIC_SERVER_URL=https://tahitizoom.pf

# SMTP iCloud+
SMTP_HOST=smtp.mail.me.com
SMTP_PORT=587
SMTP_USER=ssayeb@icloud.com
SMTP_PASS=<app-specific-password>
SMTP_FROM=contact@tahitizoom.pf

# Facebook Graph API
FB_PAGE_ID=<page_id>
FB_PAGE_ACCESS_TOKEN=<page_access_token>

# Sécurité
SYNC_SECRET=<openssl rand -hex 32>
```

> ⚠️ Le fichier `.env` n'est **pas** versionné. Le copier manuellement après tout clone.

---

## Workflow de développement
```
ThinkPad Windows 11 (VS Code Remote SSH)
        ↓
LXC 201 dev (192.168.1.62) ← développement actif
        ↓ git push
   GitHub (TahitiZoom/tahitizoomweb — privé)
        ↓ git pull
LXC 200 prod (192.168.1.53) → tahitizoom.pf
```

### Déploiement LXC 201 (dev)
```bash
cd /var/www/tahitizoom
pm2 stop tahitizoom
rm -rf .next
npm run build
pm2 start tahitizoom
git add -A
git commit -m "feat/fix: description"
git push origin main
```

### Déploiement LXC 200 (prod)
```bash
cd /var/www/tahitizoom
git stash          # si fichiers locaux modifiés (ex: public/website-template-OG.webp)
git pull
pm2 stop tahitizoom
rm -rf .next
npm run build
pm2 start tahitizoom
```

Puis **purger le cache Cloudflare** : Dashboard → `tahitizoom.pf` → Caching → Purge Everything.

### Migrations base de données
```bash
# Créer une migration (après modification de collection)
npx payload migrate:create --name description_du_changement

# Appliquer les migrations
npx payload migrate
```

> ⚠️ La BDD Turso est **partagée** entre dev et prod. Une migration appliquée sur LXC 201 est immédiatement effective sur LXC 200 aussi.

---

## Règles importantes
```
# Ne jamais lancer VS Code Remote ou Claude Code sur LXC 200 (prod)
# MongoDB écarté → Turso SQLite uniquement (incompatibilité AVX sur le hardware)
# .env non versionné → copier manuellement après clone
# public/media non versionné → synchroniser via scp entre LXC
# Proxmox upgrade vers 9.1 différé (risque kernel T2 + renommage interfaces)
```

---

## Identité visuelle

- **Marque** : Tahiti Zoom
- **Slogan principal** : CADRER. CODER. CRÉER.
- **Baseline** : L'ŒIL ET LE CODE
- **Voix** : première personne (je/votre), ancrage Fenua/Tahiti
- **Langue principale** : français
- **Logo** : signature manuscrite `logo.png` (desktop) + favicon carré `Logo-Tahiti-Zoom-144x144.png` (mobile)

---

## Meta API Facebook

App **TahitiZoom Pages** (type Business) configurée pour la lecture de la Page Facebook.

| Paramètre | Valeur |
|-----------|--------|
| App | TahitiZoom Pages (Business) |
| Permissions | `pages_show_list`, `pages_read_engagement`, `pages_manage_posts` |
| Portefeuille | Tahiti Zoom (vérifié) |

> L'app Consumer "TahitiZoom API" est conservée pour les usages OAuth utilisateur.

---

## Liens utiles

- **Site** : https://tahitizoom.pf
- **Admin** : https://tahitizoom.pf/admin
- **Repository** : https://github.com/TahitiZoom/tahitizoomweb (privé)
- **Payload CMS docs** : https://payloadcms.com/docs
- **Turso docs** : https://docs.turso.tech
- **Cloudflare Tunnel** : https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/

---

*© 2026 Tahiti Zoom — Made with ♥ by Stéphane Sayeb*
