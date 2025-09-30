# 📄 Parcours client – TerraStab (post-CTA)

## 🎯 Objectif

Transformer un visiteur informé et motivé en **client engagé** via un **parcours simple, fluide et rassurant**, qui mène à un **paiement d’acompte** adapté à son niveau de risque.

---

## 🚪 Point d’entrée

- Le parcours est déclenché par un clic sur le CTA “Vérifier mon risque maintenant”.
- Il se déroule **hors de la landing page**, dans un **module dédié** (pages ou composants React).
- Il doit être **mobile-first**, rapide (< 5 min), avec **feedback visuel** à chaque étape.

---

## 🧭 Étapes du parcours client

| Étape | Nom | Objectif | Contenu |
|-------|-----|----------|---------|
| 1️⃣ | **Simulateur de risque** | Identifier le niveau de risque de l’habitation | - Saisie de l’adresse<br>- Chargement visuel (“analyse en cours…”)<br>- Résultat personnalisé : Faible / Moyen / Fort |
| 2️⃣ | **Recommandation personnalisée** | Contextualiser le risque avec une réponse claire et orientée action | - Message adapté au niveau de risque<br>- Illustration ou pictogramme<br>- CTA : “Configurer ma solution” |
| 3️⃣ | **Configuration rapide** | Collecter les infos essentielles sans friction | - Formulaire simplifié :<br>  - Type de maison<br>  - Année<br>  - Problèmes visibles<br>  - Photos (optionnelles)<br>- Barre de progression<br>- Option : “Être rappelé par un conseiller” |
| 4️⃣ | **Devis dynamique** | Rassurer et proposer un passage à l’acte concret | - Résumé de la solution<br>- Acompte recommandé selon niveau de risque :<br>  - Faible → 199 €<br>  - Moyen → 349 €<br>  - Fort → 399 €<br>- Délais de livraison estimés<br>- CTA : “Payer mon acompte” |
| 5️⃣ | **Paiement sécurisé** | Clôturer le parcours avec un engagement financier clair | - Intégration Stripe / PayPal / Virement<br>- Résumé des infos<br>- Feedback visuel (confirmation + email)<br>- Option de suivi / rappel par conseiller |

---

## 🧠 Points clés UX

- ✅ **Pas de retour en arrière obligatoire** : chaque étape valide la précédente.
- ✅ **Progression visuelle claire** (stepper, animation de transition…).
- ✅ **Micro-interactions** à chaque étape : loaders, confirmations, tooltips.
- ✅ **Assistance humaine** accessible au besoin (bouton ou encart).

---

## ⚠️ Zone sensible (point de friction)

### ➡️ Entre étape 2 (Recommandation) et étape 3 (Configuration)

- Risque de décrochage à cause du formulaire.
- Solution : Form simplifié, prérempli si possible, ou possibilité de contact humain.

---

## 🎯 Résultat attendu

- L’utilisateur ressort du parcours :
  - Avec une **vision claire de son risque**
  - Une **solution technique crédible**
  - Un **devis adapté et compréhensible**
  - Et **a payé un acompte** ou a demandé un rappel

---

_TerraStab – Un parcours fluide, rassurant, et calibré pour engager._