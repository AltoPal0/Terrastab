# 📝 Guide : Activer les articles SEO "Comprendre le risque"

## 🎯 Objectif

Ce système permet d'activer/désactiver facilement les liens dans le menu "Comprendre le risque" du Header, sans toucher au code du composant Header lui-même.

---

## 🚀 Comment activer un article quand il est prêt ?

### Étape 1 : Vérifier que l'article est complet

1. Ouvrir le composant dans `src/components/seo/NomDuComposant.tsx`
2. Vérifier que le contenu est complet (pas juste un titre)
3. S'assurer que le composant a du contenu SEO riche

**Exemple d'article complet :**
- `DiagnosticRga.tsx` ✅ (article riche avec H2, H3, FAQ, CTAs)

**Exemple d'article incomplet :**
- `MaisonFissuree.tsx` ❌ (juste un titre et 2 lignes)

### Étape 2 : Activer le lien dans la config

Ouvrir le fichier **`src/config/seoLinks.ts`**

```typescript
{
  title: "Diagnostic RGA",
  href: "/diagnostic-rga",
  enabled: true // ← Changer false en true
}
```

### Étape 3 : Tester localement

```bash
npm run dev
```

Vérifier que :
- Le menu "Comprendre le risque" apparaît dans le Header
- Le lien vers l'article est présent
- La page `/diagnostic-rga` s'affiche correctement

### Étape 4 : Build et déploiement

```bash
npm run build
# Vérifier qu'il n'y a pas d'erreurs
```

Si tout est OK, commit et push :

```bash
git add src/config/seoLinks.ts
git commit -m "Activation de l'article SEO: Diagnostic RGA"
git push
```

---

## 📋 État actuel des articles

| Article | Statut | Action nécessaire |
|---------|--------|-------------------|
| Maison fissurée | ❌ Incomplet | Rédiger le contenu complet |
| **Diagnostic RGA** | ✅ **ACTIF** | Aucune - Déjà publié |
| Stabilisation sols | ❌ À vérifier | Vérifier le contenu du composant |
| Fissures maison | ❌ À vérifier | Vérifier le contenu du composant |
| Fissures murs | ❌ À vérifier | Vérifier le contenu du composant |
| Zones RGA France | ❌ À vérifier | Vérifier le contenu du composant |

---

## 🛠️ Structure technique (pour référence)

### Architecture Vike

```
pages/
  diagnostic-rga/
    +Page.tsx           ← Route /diagnostic-rga
  maison-fissuree/
    +Page.tsx           ← Route /maison-fissuree
  ...

src/
  components/
    seo/
      DiagnosticRga.tsx  ← Contenu de l'article
      MaisonFissuree.tsx ← Contenu de l'article
      ...
  config/
    seoLinks.ts          ← CONFIGURATION DES LIENS (fichier à modifier)
```

### Comment ça marche ?

1. **Page Vike** (`pages/diagnostic-rga/+Page.tsx`) :
   - Gère le SEO (Helmet)
   - Importe le composant de contenu
   - `export const prerender = true` pour SSG

2. **Composant de contenu** (`src/components/seo/DiagnosticRga.tsx`) :
   - Contient tout le HTML de l'article
   - Header + Footer + contenu

3. **Config centralisée** (`src/config/seoLinks.ts`) :
   - Liste de tous les liens SEO
   - Flag `enabled` pour activer/désactiver
   - Le Header lit automatiquement cette config

4. **Header** (`src/components/Header.tsx`) :
   - Importe `getActiveSeoLinks()`
   - Affiche uniquement les liens où `enabled: true`
   - Si aucun lien actif → menu masqué complètement

---

## ✅ Avantages de ce système

1. **Simple** : Un seul fichier à modifier (`seoLinks.ts`)
2. **Sûr** : Impossible de casser le Header en activant un lien
3. **Progressif** : Activez les articles un par un au fur et à mesure
4. **Propre** : Menu masqué automatiquement si aucun article actif
5. **Maintenable** : Un seul endroit pour gérer tous les liens SEO

---

## 🆘 Dépannage

**Le menu ne s'affiche pas après activation ?**
- Vérifier que `enabled: true` dans `seoLinks.ts`
- Relancer le dev server (`npm run dev`)
- Vider le cache du navigateur (Cmd+Shift+R)

**Erreur 404 sur la page article ?**
- Vérifier que le fichier `pages/nom-article/+Page.tsx` existe
- Vérifier que le composant dans `src/components/seo/` existe

**Build échoue ?**
- Vérifier les imports dans les composants SEO
- Vérifier que tous les composants ont un export default

---

## 📞 Questions ?

Pour toute question ou problème, consulter :
- `/specs/seo/` : Documentation de la stratégie SEO
- `CLAUDE.md` : Documentation générale du projet
