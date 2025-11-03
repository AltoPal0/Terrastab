# 🚀 Guide Rapide : Activer un Article SEO

## ✅ C'est fait !

La section "Comprendre le risque" a été **retirée du Header** car la plupart des articles ne sont pas encore rédigés.

**Actuellement actif :**
- ✅ **Diagnostic RGA** (seul article complet et publié)

---

## 📋 Pour activer un nouvel article (ULTRA SIMPLE)

### 1️⃣ Ouvrir un seul fichier

```
src/config/seoLinks.ts
```

### 2️⃣ Changer `false` en `true`

```typescript
{
  title: "Maison fissurée: causes et solutions",
  href: "/maison-fissuree",
  enabled: true  // ← Changer ici
}
```

### 3️⃣ Commit & Push

```bash
git add src/config/seoLinks.ts
git commit -m "Activation article: Maison fissurée"
git push  # ⚠️ Demander la permission avant de push
```

**C'est tout !** Le menu apparaît automatiquement dans le Header avec le nouvel article.

---

## 🎯 Avantages de ce système

| Avant | Maintenant |
|-------|------------|
| Modifier le Header.tsx (complexe) | Modifier seoLinks.ts (1 ligne) |
| 6 pages vides visible = mauvais SEO | Uniquement les articles prêts |
| Pages cassées si contenu incomplet | Protection automatique |
| Risque d'oublier des liens | Liste centralisée |

---

## 📊 État actuel des articles

```
✅ Diagnostic RGA              [PUBLIÉ - excellent contenu]
❌ Maison fissurée             [Contenu à rédiger]
❌ Stabilisation sols argileux [À vérifier]
❌ Fissures maison            [À vérifier]
❌ Fissures murs              [À vérifier]
❌ Zones RGA France           [À vérifier]
```

---

## 🔍 Comment vérifier si un article est prêt ?

1. Ouvrir le fichier du composant :
   ```
   src/components/seo/DiagnosticRga.tsx     ← Exemple d'article COMPLET
   src/components/seo/MaisonFissuree.tsx    ← Exemple d'article INCOMPLET
   ```

2. Vérifier qu'il contient :
   - ✅ H1, H2, H3 (structure SEO)
   - ✅ Plusieurs paragraphes de contenu
   - ✅ CTAs (Call-to-actions)
   - ✅ Liens internes
   - ✅ Au moins 500+ mots

3. Si c'est OK → activer dans `seoLinks.ts`

---

## 🛠️ Architecture (pour référence)

```
pages/
  diagnostic-rga/
    +Page.tsx              ← Page Vike avec SEO (Helmet)

src/
  components/
    seo/
      DiagnosticRga.tsx    ← Contenu de l'article

  config/
    seoLinks.ts            ← ⭐ FICHIER À MODIFIER
```

**Système automatique :**
- Si `enabled: true` → Le lien apparaît dans le Header
- Si `enabled: false` → Le lien est masqué
- Si aucun lien actif → Menu "Comprendre le risque" masqué

---

## 📚 Documentation complète

Pour plus de détails, voir : `src/config/README_SEO.md`

---

## ⚡ Exemple complet

**Vous venez de finir l'article "Maison fissurée" :**

1. Ouvrir `src/config/seoLinks.ts`

2. Trouver :
   ```typescript
   {
     title: "Maison fissurée: causes et solutions",
     href: "/maison-fissuree",
     enabled: false // ❌
   }
   ```

3. Changer en :
   ```typescript
   {
     title: "Maison fissurée: causes et solutions",
     href: "/maison-fissuree",
     enabled: true // ✅
   }
   ```

4. Tester :
   ```bash
   npm run dev
   # Ouvrir http://localhost:5173
   # Vérifier que le menu "Comprendre le risque" s'affiche
   # Vérifier que le lien "Maison fissurée" est présent
   # Cliquer et vérifier que la page s'affiche
   ```

5. Build :
   ```bash
   npm run build
   # Vérifier qu'il n'y a pas d'erreurs
   ```

6. Deploy :
   ```bash
   git add src/config/seoLinks.ts
   git commit -m "feat: activation article SEO Maison fissurée"
   # git push (demander permission)
   ```

---

## 🎉 C'est tout !

Un seul fichier à modifier, protection SEO automatique, déploiement progressif facile.

**Questions ?** Voir `src/config/README_SEO.md` ou demander à Claude !
