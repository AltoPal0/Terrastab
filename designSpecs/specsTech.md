# 🧱 Tech Stack – Site TerraStab

Ce document détaille les choix techniques retenus pour la refonte du site TerraStab, dans le but de créer une expérience haut de gamme, sobre mais riche en micro-interactions, optimisée pour mobile et la conversion.

---

## 🎯 Objectifs du site

- Soutenir la croissance de la startup en affichant du **momentum** crédible.
- Faciliter la conversion grâce à un **parcours client fluide** et un système d’**acomptes de prévente**.
- Renforcer la **confiance**, jouer sur la **peur de perte de valeur** du patrimoine, et limiter la friction.

---

## ⚙️ Stack Frontend

| Technologie | Rôle | Pourquoi |
|-------------|------|----------|
| **React** + **Vite** | Framework + bundler | Ultra rapide, moderne, parfait pour interactions dynamiques. Vite offre un dev server très fluide. |
| **TailwindCSS** | Design system utilitaire | Permet un design cohérent, responsive, rapide à implémenter, facile à ajuster. |
| **Framer Motion** | Micro-animations | Pour des animations élégantes (hover, scroll, transitions, modales). |
| **Radix UI** | Composants accessibles | Fournit des composants prêts à l’emploi (accordéons, modales…) avec accessibilité intégrée. |
| **Lucide Icons** | Icônes SVG modernes | Icônes cohérentes, simples à styliser et animables. |

---

## 🗄️ Backend / CMS / Auth

| Technologie | Rôle | Pourquoi |
|-------------|------|----------|
| **Supabase** | Auth + Database + API | Solution complète et simple pour gérer les utilisateurs, les formulaires, et stocker des données (simulations, leads, etc.). |
| **Edge Functions Supabase** | Logic custom | Pour des traitements personnalisés sans backend lourd (ex. : simulation de risque, scoring). |

---

## ☁️ Déploiement & Hosting

| Technologie | Rôle | Pourquoi |
|-------------|------|----------|
| **Vercel** | Build & hébergement | Intégration native avec Next/Vite, preview par branche, CDN intégré, rapidité de déploiement. |
| **Vercel Image Optimization** | Optimisation images | Compression automatique, responsive images, temps de chargement optimisé. |

---

## 🧠 Micro-interactions & UX

- Transitions douces entre les étapes du parcours utilisateur.
- Feedback visuel (loading, hover, erreurs, validation) sur tous les éléments interactifs.
- Animations à l’apparition des éléments au scroll.
- Effets tactiles sur mobile (animation boutons, progressions, etc.).
- Parcours linéaire fluide, pensé mobile-first.

---

## 📱 Design Principles

- **Tonalité** : sérieuse mais rassurante, scientifique vulgarisée, directe.
- **Design** : épuré, moderne, inspiré des univers “tech-for-good” (couleurs naturelles + bleus tech).
- **Responsive** : 100% mobile-first.
- **Optimisation SEO & performance** : Lighthouse > 90 sur mobile.

---

## 🔧 Stack installée (validée)

- `react@19.x`
- `vite@7.x`
- `tailwindcss@4.x`
- `framer-motion@12.x`
- `@radix-ui/react-accordion@1.2.x`
- `lucide-react@0.5xx`
- `supabase@2.x`
- Hébergement : **Vercel** avec intégration Git

---

## 🚀 Prochaines étapes

1. 💡 **Revue de l’UI existante** et priorisation des composants à refondre.
2. 🎨 **Création de maquettes haute fidélité** avec navigation animée.
3. 🧱 **Architecture des composants** + découpage par sections.
4. ⚙️ **Implémentation progressive** avec versionning.
5. ✅ Tests, SEO, et publication.

---

_TerraStab – Construisons la confiance, un pixel à la fois._