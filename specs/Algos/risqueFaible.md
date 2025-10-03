# Spécification Algorithme — Risque Faible (v1)

Ce document définit la logique du formulaire et des calculs pour l’évaluation **Risque Faible**.  
Les étapes sont numérotées par dizaines (10, 20, 30…) pour permettre l’ajout d’étapes intermédiaires.  
Certaines étapes sont purement **informatives** (sans impact sur le calcul).  
Chaque version de l’algorithme est **attachée à un devis** pour assurer la traçabilité.

## Support technique
- **Base de données :** Supabase (Postgres)  
- **Stockage :** toutes les tables décrites ci-dessous sont créées et maintenues dans Supabase.  
- **Versionnage :** chaque devis doit référencer l’`id` et la `version` du `rule_set` utilisé.  
- **Traçabilité :** Supabase conserve :  
  - les réponses brutes (`submissions`)  
  - les résultats (`results`)  
  - l’artefact de l’algorithme (`algo_table`)  
  - les prix unitaires (`price_book`)  
  - les profils utilisateurs (`users`)  

---

## Bloc 00 — Type de logement
**Question :** Quel est le type de logement ?  
- Pavillon  
- Maison mitoyenne  
- Bâtiment industriel  

**ⓘ Information :** Le type de bâtiment aide à mieux qualifier la situation du logement et à personnaliser le diagnostic.

---

## Bloc 10 — Sous-sol
**Question :** Le logement possède-t-il un sous-sol ?  
- Oui  
- Non  

**ⓘ Information :** La présence d’un sous-sol influence fortement la manière dont le sol interagit avec la structure du bâtiment.

---

## Bloc 20 — Année de construction
**Question :** Quelle est l’année de construction du logement ?  
- Avant 2000  
- 2000 ou après  

**ⓘ Information :** L’année de construction permet d’évaluer les normes techniques appliquées et la robustesse des fondations.

---

## Bloc 30 — Surface
**Question :** Quelle est la surface totale du logement (en m²) ?  
- Saisie numérique en m²  

**ⓘ Information :** La surface conditionne l’ampleur de l’étude nécessaire pour couvrir correctement le bâtiment.

---

## Bloc 40 — Murs sans terrasse
**Question :** Combien de murs sans terrasse le logement comporte-t-il ?  
- Saisie numérique  

**ⓘ Information :** Les murs sans appui (terrasse ou autre structure attenante) sont plus exposés aux mouvements de sol.

---

## Bloc 50 — Zones vertes et surveillance
**Question :** Combien de zones vertes sont présentes autour du logement ?  
- Saisie numérique  

**Question :** Souhaitez-vous mettre ces zones vertes sous surveillance ?  
- Oui  
- Non  

**ⓘ Information :** La végétation proche influence directement le sol. Connaître les zones vertes et leur surveillance permet d’adapter la protection.

---

## Bloc 70 — Extensions
**Question :** Combien d’extensions sont présentes autour du logement (garages, annexes, vérandas, etc.) ?  
- Saisie numérique  

**ⓘ Information :** Les extensions peuvent fragiliser la structure si elles reposent sur des sols sensibles, il est important de les prendre en compte.

---
## Table ALGO — Exemple complet (Risque Faible v1)

| id | rule_set_version | bloc | question | condition | nbr_sonde | nbr_sonde_double | note |
|----|------------------|------|----------|-----------|-----------|------------------|------|
| 1  | v1.0 | 00 | Type de logement | Maison mitoyenne | 0 | +2 | Ajoute 2 sondes doubles forfaitaires |
| 2  | v1.0 | 10 | Sous-sol | Oui  | x0 | x0 | Stop : pas de facturation si sous-sol présent |
| 3  | v1.0 | 20 | Année de construction | ≥2000 | x0 | x0 | Stop : pas de facturation pour maisons récentes |
| 4  | v1.0 | 30 | Surface | Par tranche de 200 m² | +1 par tranche | 0 | Chaque tranche ajoute 1 sonde |
| 5  | v1.0 | 30 | Surface | Toujours | 0 | +1 | Ajoute une sonde double fixe |
| 6  | v1.0 | 40 | Murs sans terrasse | =0 | x0 | x0 | Stop : pas de facturation si aucun mur sans terrasse |
| 7  | v1.0 | 40 | Murs sans terrasse | >0 | +1 par mur | 0 | Chaque mur sans terrasse ajoute 1 sonde |
| 8  | v1.0 | 50 | Zones vertes | Surveillance = Oui | +1 par zone | 0 | Chaque zone verte surveillée ajoute 1 sonde |
| 9  | v1.0 | 50 | Zones vertes | Surveillance = Non | 0 | 0 | Pas de sonde si zones non surveillées |
| 10 | v1.0 | 70 | Extensions | Par unité | +1 par extension | 0 | Chaque extension ajoute 1 sonde |

---

## Table PRICE_BOOK — Prix unitaires

Chaque version d’algorithme dispose de son propre barème de prix.  

| champ | type | description |
|-------|------|-------------|
| id | uuid | Identifiant unique |
| rule_set_version | text | Version de l’algo associée |
| item_type | text | Type de matériel (ex : `sonde`, `sonde_double`, `piquet_irrigation`, `controller`) |
| unit_price | numeric | Prix unitaire en euros |
| currency | text | Code devise (ex : EUR) |
| effective_at | timestamptz | Date de mise en vigueur |

---

## Table RESULTS — Enregistrement des études et devis

Chaque étude réalisée par un utilisateur est enregistrée avec :  
- **Réponses utilisateur (inputs)**  
- **Version d’algorithme utilisée**  
- **Résultats intermédiaires** (quantités par type de matériel)  
- **Devis final**

| champ | type | description |
|-------|------|-------------|
| id | uuid | Identifiant unique de l’étude |
| user_id | uuid (nullable) | Identifiant de l’utilisateur (si connu) |
| rule_set_version | text | Version de l’algorithme appliquée |
| answers_json | jsonb | Réponses brutes de l’utilisateur |
| contributions_json | jsonb | Détail des +sondes par bloc appliqué |
| nbr_sonde | int | Nombre total de sondes simples |
| nbr_sonde_double | int | Nombre total de sondes doubles |
| nbr_piquet_irrigation | int | Nombre total de piquets (si applicable) |
| nbr_controller | int | Nombre total de contrôleurs (si applicable) |
| devis_total | numeric | Montant du devis calculé (somme des quantités × prix unitaires) |
| created_at | timestamptz | Date de création de l’étude |

---

## Table USERS — Profils et modes de contact

Chaque utilisateur peut choisir un mode de contact/connexion :  
- Téléphone  
- Email classique  
- Gmail / Google  
- LinkedIn  
- Apple  

| champ | type | description |
|-------|------|-------------|
| id | uuid | Identifiant unique |
| contact_mode | enum | `phone`, `email`, `gmail`, `google`, `linkedin`, `apple` |
| phone | text (nullable) | Numéro de téléphone |
| email | text (nullable) | Adresse email |
| external_id | text (nullable) | ID externe (Google/LinkedIn/Apple) |
| created_at | timestamptz | Date de création |
| last_login | timestamptz | Dernière connexion |
| metadata | jsonb | Données supplémentaires (préférences, tags, etc.) |

---

## Notes de conception
- **ALGO** : version immuable, jamais modifiée une fois publiée.  
- **PRICE_BOOK** : lié à la même version de l’algo pour cohérence devis.  
- **RESULTS** : trace complète d’une étude (inputs + outputs + devis).  
- **USERS** : gère l’identité et le canal de contact choisi.  
- Chaque devis stocke la **version de l’algo** et du **price book** utilisés, garantissant la reproductibilité.

## Notes de conception
- Chaque **Table ALGO** est **versionnée** (`rule_set_version`) et ne doit jamais être modifiée une fois active.  
- Chaque **Table RESULTS** enregistre les données brutes + les résultats liés à une version spécifique.  
- Cela permet de recalculer ou d’auditer tout devis, même si l’algorithme évolue.  