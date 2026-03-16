# rkshrd — Portfolio

Mon portfolio professionnel, pour mon BTS SIO option SISR (Cybersécurité & Administration Systèmes et Réseaux).

## Stack technique

| Catégorie   | Technologies             |
| ----------- | ------------------------ |
| Framework   | Next.js 16, React 19     |
| Langage     | TypeScript 5             |
| Style       | Tailwind CSS 4           |
| Animations  | Framer Motion            |
| Icônes      | Lucide React             |
| Drag & Drop | dnd-kit                  |
| Thème       | next-themes (dark/light) |

## Fonctionnalités

- **Accueil** — Effet de frappe séquentiel, bloc de code stylisé, bougie interactive (drag & drop)
- **Profil** — Bio, compétences, certifications avec badge au survol, timeline, hobbies
- **Parcours** — Détails du BTS SIO SISR
- **Expériences** — Sélecteur d'entreprises avec transitions animées
- **Projets** — Cartes avec effet flip, export JSON des projets
- **Veille technologique** — Articles filtrables par thème et tags (MFA, ZTNA, SIEM)
- **UI** — Thème dark/light, horloge live (fuseau Paris), barre de progression au scroll, curseur personnalisé, menu hamburger animé

## Prérequis

- Node.js ≥ 18
- npm

## Installation

```bash
npm install
```

## Lancement

**Développement :**

```bash
npm run dev
```

Le serveur démarre sur `http://127.0.0.1:3000`.

**Production (export statique) :**

```bash
npm run build
npm run start
```

Le site statique est généré dans `out/` et servi sur `http://127.0.0.1:3001`.

## Scripts disponibles

| Commande         | Description              |
| ---------------- | ------------------------ |
| `npm run dev`    | Serveur de développement |
| `npm run build`  | Build et export statique |
| `npm run start`  | Sert le build statique   |
| `npm run format` | Formatage du code        |
| `npm run check`  | Vérification TypeScript  |
| `npm run lint`   | Lint ESLint              |

## Structure du projet

```
src/
├── app/            # Pages (App Router)
├── components/     # Composants réutilisables (UI, terminal, veille)
├── data/           # Données JSON (skills, projets, timeline, veille)
├── lib/            # Utilitaires
└── types/          # Types TypeScript
public/             # Assets statiques (CV, certifications, images)
scripts/            # Scripts de formatage
```

## Déploiement

Le projet est configuré en export statique (`output: 'export'`). Le dossier `out/` généré par `npm run build` peut être déployé sur n'importe quel hébergement statique (GitHub Pages, Vercel, Netlify, etc.).