# 📄 Structure finale de la landing page – TerraStab

## 🎯 Objectif principal

La landing page doit **convertir rapidement** les visiteurs **déjà sensibilisés au RGA** en les incitant à **lancer le diagnostic** via un CTA principal. Elle doit aussi soutenir la croissance de la startup en affichant du **momentum**, de la **crédibilité**, et un **parcours client fluide**.

---

## ✅ Résumé des décisions clés

- Le **CTA principal** (“Vérifier mon risque maintenant”) doit apparaître **dès le Hero**, sans attendre.
- Le **visiteur est déjà informé** du problème RGA → inutile de l’éduquer longuement.
- Le **parcours client (simulateur, config, devis, acompte)** se lance **hors de la landing page**.
- Les sections **Technologie** et **Pourquoi agir maintenant ?** doivent **exister** mais **sous forme condensée** (visuelles, claires, courtes).
- On vise une **landing page sobre, rapide à lire, mobile-first**, avec des **micro-interactions modernes**.
- Un **CTA secondaire** (sticky) doit être **toujours visible** pendant le scroll mobile.

---

## 🧭 Ordre final des sections (landing uniquement)

| Ordre | Section | Rôle | Contenu principal |
|-------|---------|------|-------------------|
| 1️⃣ | **Hero avec CTA direct** | Déclencher l’action immédiatement | Titre fort + bouton “Vérifiez votre risque maintenant” |
| 2️⃣ | **Mini-promesse TerraStab** | Renforcer l’intention juste après le Hero | Phrase courte : “Une solution sur mesure, rapide et fiable pour stabiliser votre maison.” |
| 3️⃣ | **Avis d’experts (preuve sociale condensée)** | Crédibilité immédiate par autorité externe | Citations ou résumés d’avis d’experts du bâtiment ou de la géotechnique |
| 4️⃣ | **Technologie (version courte)** | Montrer que la solution est sérieuse, différenciante | 3 étapes visuelles simples + nom fort de la techno |
| 5️⃣ | **Confiance & légitimité** | Rassurer plus en profondeur | Logos, labels, Made in France, engagements qualité |
| 6️⃣ | **Pourquoi agir maintenant ? (version courte)** | Activer l’urgence | 1 phrase choc + 1 image illustrative + perte de valeur chiffrée |
| 7️⃣ | **FAQ & Garanties** | Répondre aux objections | Format accordéon, rassurant, direct |
| 8️⃣ | **Second CTA** | Dernière opportunité d'engagement | “Vérifiez votre risque gratuitement” |
| 9️⃣ | **Footer** | Infos secondaires | Mentions légales, contact, réseaux sociaux |

---

## 📱 Mobile-first – Stratégie de gestion du contenu dense

Pour garantir une **lecture fluide et engageante sur smartphone**, tout en conservant les éléments de réassurance et de pédagogie :

### 1. **Hiérarchiser fortement le contenu**
- 1 idée par section
- Titres courts, sous-titres clairs, visuels légers

### 2. **Utiliser des composants interactifs pour compacter**
- Accordéons (FAQ, détails techniques)
- “Lire plus / moins” (témoignages, cas clients)
- Carrousels horizontaux (témoignages, étapes)
- Tabs mobiles (techno / garanties / à propos)
- Scroll progressif (révélation d'infos au fur et à mesure)

### 3. **Typographie adaptée au mobile**
- Titre : `text-xl` à `text-2xl`
- Paragraphes : `text-sm` à `text-base` avec `leading-relaxed`
- Espacement vertical généreux : `py-4` à `py-6`
- Marges latérales : `px-4` minimum

### 4. **Réduire le verbiage intelligemment**
- Reformulation à l’oral, plus directe
- Liste à puces avec icônes
- Storytelling visuel plutôt que texte brut

### 5. **Contenu secondaire = optionnel**
- Détails techniques dans pages annexes ou PDF
- Focus sur la conversion rapide
- “En savoir plus” pour les curieux

### 6. **Animations progressives**
- Affichage au scroll avec Framer Motion
- Éviter de tout charger d’un coup
- Ancrage par section pour orientation UX

---

## 📌 CTA sticky pendant le scroll (mobile)

### Objectif
Maintenir une **possibilité constante de démarrer le diagnostic**, même lorsque l'utilisateur scrolle.

### Implémentation recommandée
**Sticky bottom CTA** :

```html
<div class="fixed bottom-4 left-4 right-4 z-50 md:hidden">
  <button class="w-full bg-primary text-white py-3 rounded-xl shadow-xl text-base">
    Vérifiez votre risque maintenant
  </button>
</div>