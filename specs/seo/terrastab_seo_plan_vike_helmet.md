# TerraStab – Plan SEO Global 2025 (Version Vike + Helmet)

## 🌐 Structure du site

| Type de page       | Fichier `.page.tsx` / route            | Objectif                                 | Intention principale     |
| ------------------ | -------------------------------------- | ---------------------------------------- | ------------------------ |
| Landing principale | `/index.page.tsx`                      | Présentation + lead capture              | Conversion               |
| Sous-page 1        | `/maison-fissuree-argile.page.tsx`     | Relier fissures et sol argileux          | Émotionnelle + éducative |
| Sous-page 2        | `/diagnostic-rga.page.tsx`             | Expertise et devis                       | Transactionnelle         |
| Sous-page 3        | `/solution-stabilisation-sol-argileux.page.tsx` | Montrer la solution TerraStab | Commerciale              |
| Sous-page 4        | `/fissures-maison.page.tsx`            | Attirer le grand public sur les fissures | Découverte / volume      |
| Sous-page 5        | `/zones-rga-france.page.tsx`           | Référencement local et technique         | Locale / autorité        |

---

## ⚙️ Spécificités techniques (Vike + Helmet)

### 🧩 Rendu côté serveur / statique

- Les pages sont rendues côté serveur (SSR) ou générées statiquement (SSG) par Vike.
- Les balises `<title>` et `<meta>` sont présentes dans le HTML initial, avant hydratation React.
- Google et les IA (Perplexity, ChatGPT Search, etc.) peuvent indexer directement chaque page.
- Cela élimine les problèmes classiques du SEO sur SPA.

### 🧠 Helmet (SEO par page)

Chaque page utilise `@dr.pogodin/react-helmet` (successeur de react-helmet-async pour React 19+).

```tsx
import { Helmet } from "@dr.pogodin/react-helmet";

export const prerender = true;

export function Page() {
  return (
    <>
      <Helmet>
        <title>…</title>
        <meta name="description" content="…" />
        <link rel="canonical" href="https://terrastab.fr/..." />
      </Helmet>
      <main>… contenu …</main>
    </>
  );
}
```

✅ Avantages :
- Chaque page a ses métadonnées propres (Google comprend les différences).
- Le HTML est complet côté serveur → indexation immédiate.
- Compatible avec l’export statique Vike (`prerender: true`).

### 🧱 Organisation des fichiers

```
src/
  pages/
    index.page.tsx
    maison-fissuree-argile.page.tsx
    diagnostic-rga.page.tsx
    solution-stabilisation-sol-argileux.page.tsx
    fissures-maison.page.tsx
    zones-rga-france.page.tsx
  components/
    Layout.tsx
    CTAButton.tsx
```

Chaque page :
- est encapsulée dans `<Layout>` pour la cohérence graphique,
- contient un `<Helmet>` pour son SEO propre,
- se termine par un CTA vers `/#diagnostic` ou `/#formulaire`.

---

## 🧩 Liens internes (maillage sémantique)

- Toutes les sous-pages renvoient vers `/` via CTA (diagnostic, devis, estimation)
- `/maison-fissuree-argile` → `/diagnostic-rga` et `/solution-stabilisation-sol-argileux`
- `/fissures-maison` → `/diagnostic-rga`
- `/zones-rga-france` → `/#formulaire`

---

## 🏷️ Titles & Meta Descriptions

### `/maison-fissuree-argile`
**Title :** Maison fissurée ? Le rôle du sol argileux (RGA) – TerraStab  
**Meta :** Votre maison se fissure ? Découvrez comment le retrait-gonflement des argiles provoque des fissures et comment TerraStab peut stabiliser votre sol.

### `/diagnostic-rga`
**Title :** Diagnostic RGA : détecter les risques liés aux sols argileux – TerraStab  
**Meta :** Faites évaluer votre maison par nos experts RGA. Diagnostic complet du sol et des fondations pour prévenir les fissures dues au retrait-gonflement des argiles.

### `/solution-stabilisation-sol-argileux`
**Title :** Stabilisation de sol argileux : la solution durable TerraStab  
**Meta :** Découvrez la solution TerraStab pour stabiliser les sols argileux et protéger durablement votre maison contre le retrait-gonflement des argiles.

### `/fissures-maison`
**Title :** Fissures sur votre maison : causes, risques et solutions  
**Meta :** Fissures sur les murs ? Apprenez à reconnaître les causes et découvrez comment les experts TerraStab réparent et stabilisent les maisons fissurées.

### `/zones-rga-france`
**Title :** Carte des zones RGA en France : êtes-vous concerné ? – TerraStab  
**Meta :** Consultez la carte des zones à risque RGA en France et découvrez si votre maison est exposée au retrait-gonflement des argiles. Diagnostic gratuit avec TerraStab.

---

## 🗺️ Sitemap suggéré

```
https://terrastab.fr/
https://terrastab.fr/maison-fissuree-argile
https://terrastab.fr/diagnostic-rga
https://terrastab.fr/solution-stabilisation-sol-argileux
https://terrastab.fr/fissures-maison
https://terrastab.fr/zones-rga-france
```

---

## 🔗 Navigation & ancrages

### Depuis la landing page `/`
Section « Comprendre le risque » listant :
- Maison fissurée et sol argileux
- Diagnostic RGA
- Stabilisation du sol
- Fissures maison
- Zones RGA en France

### CTA global
Tous les boutons d’action redirigent vers :
- `/#diagnostic` ou `/#formulaire`

---

## 🧭 Bonnes pratiques SEO avec Vike

| Élément | Bonnes pratiques |
|----------|------------------|
| `<Helmet>` | Un par page, balises uniques (title, meta, canonical) |
| SSG/SSR | Toujours activer `export const prerender = true` pour le SSG |
| Canonical | Inclure le lien complet pour éviter la duplication |
| Sitemap | Générer automatiquement via script build (`/sitemap.xml`) |
| Robots.txt | Autoriser toutes les pages sauf `/admin` (si applicable) |

---

## 🎯 Résumé stratégique

- Architecture adaptée à **Vike SSR/SSG** → SEO optimal.
- **@dr.pogodin/react-helmet** assure le rendu des balises SEO dans le HTML pré-rendu.
- Chaque page est **autonome en SEO**, mais renvoie vers la landing pour la conversion.
- Structure compatible avec le site one-page actuel.
- Contenu déjà rédigé et optimisé pour **Google + IA (Perplexity, ChatGPT Search)**.

---

