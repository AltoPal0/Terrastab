# TerraStab - Configuration Base de Données Supabase

**Date d'export:** 2025-10-08
**Projet:** Terrastab (sddrgyovjahxigysblra)
**Région:** eu-west-3
**PostgreSQL:** v17.6.1.005

---

## 📋 Tables de la Base de Données

### 1. **risk_assessments** - Évaluations de Risque
Stocke les résultats des évaluations de risque argile pour chaque adresse.

**Colonnes:**
- `id` (uuid, PK) - Identifiant unique, auto-généré
- `created_at` (timestamptz) - Date de création UTC
- `updated_at` (timestamptz) - Date de mise à jour UTC
- `input_address` (text) - Adresse saisie par l'utilisateur
- `formatted_address` (text, nullable) - Adresse formatée par l'API Google
- `latitude` (numeric, nullable) - Coordonnée latitude
- `longitude` (numeric, nullable) - Coordonnée longitude
- `risk_level` (text) - Niveau de risque: 'Faible', 'Moyen', ou 'Élevé'
- `risk_color` (text) - Couleur associée au risque (hex)
- `risk_width` (text) - Largeur pour affichage visuel
- `risk_description` (text) - Description du niveau de risque
- `commune` (text, nullable) - Nom de la commune
- `original_exposition` (text, nullable) - Exposition originale du Géorisques
- `geocoding_success` (boolean, default: false) - Succès du géocodage
- `georisques_success` (boolean, default: false) - Succès de l'appel Géorisques
- `error_message` (text, nullable) - Message d'erreur éventuel
- `ip_address` (inet, nullable) - Adresse IP de l'utilisateur
- `user_agent` (text, nullable) - User agent du navigateur

**Indexes:**
- `risk_assessments_pkey` - PRIMARY KEY sur `id`
- `idx_risk_assessments_commune` - Index sur `commune`
- `idx_risk_assessments_coordinates` - Index composite sur `(latitude, longitude)`
- `idx_risk_assessments_created_at` - Index sur `created_at`
- `idx_risk_assessments_risk_level` - Index sur `risk_level`

**RLS Policies:**
- `Allow anonymous risk assessment inserts` - Permet insertion anonyme (role: anon)
- `Allow reading aggregated statistics` - Permet lecture pour tous (role: anon)

**Statistiques:** 58 lignes

---

### 2. **users** - Profils Utilisateurs
Profils utilisateurs avec modes de contact multiples (email, téléphone, OAuth).

**Colonnes:**
- `id` (uuid, PK) - Identifiant unique, auto-généré
- `contact_mode` (contact_mode_enum) - Mode de contact préféré
- `phone` (text, nullable) - Numéro de téléphone
- `email` (text, nullable) - Adresse email
- `external_id` (text, nullable) - ID externe (OAuth)
- `created_at` (timestamptz) - Date de création
- `last_login` (timestamptz, nullable) - Dernière connexion
- `metadata` (jsonb, default: '{}') - Métadonnées flexibles
- `auth_user_id` (uuid, nullable, unique) - ID Supabase Auth (Google, Apple, etc.)

**Enum: contact_mode_enum**
- `phone` - Contact par téléphone
- `email` - Contact par email
- `gmail` - Connexion Gmail
- `google` - Connexion Google OAuth
- `linkedin` - Connexion LinkedIn
- `apple` - Connexion Apple

**Indexes:**
- `users_pkey` - PRIMARY KEY sur `id`
- `unique_auth_user_id` - UNIQUE sur `auth_user_id`
- `idx_users_auth_user_id` - Index sur `auth_user_id WHERE NOT NULL`
- `idx_users_email` - Index sur `email WHERE NOT NULL`
- `idx_users_external_id` - Index sur `external_id WHERE NOT NULL`
- `idx_users_phone` - Index sur `phone WHERE NOT NULL`

**RLS Policies:**
- `users_insert_any` - Permet insertion pour tous (role: public)
- `users_select_own` - Permet lecture de son propre profil
- `users_update_own` - Permet mise à jour de son profil OU profils anonymes

**Statistiques:** 0 lignes

**Contraintes:**
- Foreign key référencée par `results.user_id`

---

### 3. **algo_table** - Règles de Calcul Algorithme
Règles de l'algorithme v1.0 pour le calcul des devis (immuables).

**Colonnes:**
- `id` (uuid, PK) - Identifiant unique, auto-généré
- `rule_set_version` (text) - Version des règles (ex: "v1.0")
- `bloc` (text) - Numéro du bloc de questions (ex: "bloc00")
- `question` (text) - Texte de la question
- `condition` (text) - Condition pour appliquer la règle
- `nbr_sonde` (text) - Formule pour calculer le nombre de sondes
- `nbr_sonde_double` (text) - Formule pour sondes doubles
- `note` (text, nullable) - Notes internes
- `created_at` (timestamptz) - Date de création
- `positive_message` (text, nullable) - Message positif pour conditions bloquantes
- `risk_levels` (integer[], default: '{1,2,3}') - Niveaux de risque applicables (1=Faible, 2=Moyen, 3=Fort)

**Indexes:**
- `algo_table_pkey` - PRIMARY KEY sur `id`
- `unique_algo_rule` - UNIQUE sur `(rule_set_version, bloc, condition)`
- `idx_algo_bloc` - Index sur `bloc`
- `idx_algo_rule_set_version` - Index sur `rule_set_version`

**RLS Policies:**
- `algo_select_all` - Lecture publique pour tous (role: public)

**Statistiques:** 12 lignes

**Commentaire:** Règles ALGO v1.0 insérées pour risque faible. Ces règles sont immuables.

---

### 4. **price_book** - Grille Tarifaire
Prix unitaires v1.0 pour les produits (sondes, contrôleurs, irrigation).

**Colonnes:**
- `id` (uuid, PK) - Identifiant unique, auto-généré
- `rule_set_version` (text) - Version des prix (liée à algo)
- `item_type` (text) - Type de produit
- `unit_price` (numeric, ≥0) - Prix unitaire
- `currency` (text, default: 'EUR') - Devise
- `effective_at` (timestamptz) - Date d'effet du prix
- `created_at` (timestamptz) - Date de création

**Indexes:**
- `price_book_pkey` - PRIMARY KEY sur `id`
- `unique_price_per_version` - UNIQUE sur `(rule_set_version, item_type)`
- `idx_price_book_item_type` - Index sur `item_type`
- `idx_price_book_rule_set_version` - Index sur `rule_set_version`

**RLS Policies:**
- `price_book_select_all` - Lecture publique pour tous (role: public)

**Statistiques:** 4 lignes

**Commentaire:** Prix unitaires v1.0 insérés. Liés à la version v1.0 de l'algorithme.

---

### 5. **questions** - Questions Dynamiques
Questions du questionnaire algorithme, versionnées et dynamiques.

**Colonnes:**
- `id` (uuid, PK) - Identifiant unique, auto-généré
- `bloc` (integer) - Numéro du bloc (00, 10, 20, etc.)
- `rule_set_version` (text) - Version des règles
- `question_text` (text) - Texte de la question
- `info_text` (text) - Texte d'information/aide
- `input_type` (input_type_enum) - Type d'input: boolean, numeric, select
- `options_json` (jsonb, nullable) - Options pour select/radio (format JSON)
- `order_index` (integer) - Ordre d'affichage dans le bloc
- `created_at` (timestamptz, nullable) - Date de création
- `field_name` (text) - Nom du champ dans les réponses (ex: "bloc00_housing_type")
- `risk_levels` (integer[], default: '{1,2,3}') - Niveaux de risque où apparaît la question

**Enum: input_type_enum**
- `boolean` - Oui/Non, checkbox
- `numeric` - Valeur numérique
- `select` - Liste déroulante/radio

**Indexes:**
- `questions_pkey` - PRIMARY KEY sur `id`
- `idx_questions_bloc` - Index sur `bloc`
- `idx_questions_rule_set_version` - Index sur `rule_set_version`

**RLS Policies:**
- `Questions are viewable by everyone` - Lecture publique pour tous (role: public)

**Statistiques:** 9 lignes

**Commentaire:** Questions dynamiques pour le questionnaire algo, versionnées par rule_set_version

---

### 6. **results** - Résultats et Devis
Enregistrement complet des études et devis générés.

**Colonnes:**
- `id` (uuid, PK) - Identifiant unique, auto-généré
- `user_id` (uuid, nullable, FK→users.id) - Référence utilisateur
- `risk_level` (text) - Niveau de risque: 'faible', 'moyen', ou 'fort'
- `rule_set_version` (text) - Version des règles utilisées (format: 'v1.0')
- `answers_json` (jsonb) - Réponses brutes de l'utilisateur
- `contributions_json` (jsonb, nullable) - Détail des contributions par bloc
- `nbr_sonde` (integer, ≥0, default: 0) - Nombre de sondes simples
- `nbr_sonde_double` (integer, ≥0, default: 0) - Nombre de sondes doubles
- `nbr_piquet_irrigation` (integer, ≥0, default: 0) - Nombre de piquets irrigation
- `nbr_controller` (integer, ≥0, default: 0) - Nombre de contrôleurs
- `devis_total` (numeric, ≥0, default: 0) - Montant total du devis
- `quote_id` (text, nullable, unique) - Identifiant unique lisible du devis
- `created_at` (timestamptz) - Date de création
- `address` (text, nullable) - Adresse saisie lors du survey

**Indexes:**
- `results_pkey` - PRIMARY KEY sur `id`
- `results_quote_id_key` - UNIQUE sur `quote_id`
- `idx_results_address` - Index sur `address`
- `idx_results_created_at` - Index sur `created_at DESC`
- `idx_results_quote_id` - Index sur `quote_id WHERE NOT NULL`
- `idx_results_risk_level` - Index sur `risk_level`
- `idx_results_rule_set_version` - Index sur `rule_set_version`
- `idx_results_user_id` - Index sur `user_id`

**RLS Policies:**
- `results_insert_any` - Permet insertion pour tous (role: public)
- `results_select_own` - Permet lecture de ses propres résultats ou résultats anonymes

**Statistiques:** 14 lignes

**Commentaire:** Enregistrement complet des études et devis générés

**Contraintes:**
- Foreign key: `fk_results_user` référence `users(id)`

---

## 🔐 Extensions PostgreSQL Installées

**Extensions actives:**
- `pgcrypto` (v1.3) - Fonctions cryptographiques
- `pg_stat_statements` (v1.11) - Statistiques des requêtes SQL
- `uuid-ossp` (v1.1) - Génération d'UUID
- `pg_graphql` (v1.5.11) - Support GraphQL
- `supabase_vault` (v0.3.1) - Vault Supabase

**Extensions disponibles (non installées):** 68 extensions supplémentaires disponibles

---

## 📊 Migrations Appliquées

| Version | Nom |
|---------|-----|
| 20251003094816 | create_test_table |
| 20251003101153 | 002_create_algo_system |
| 20251003101219 | 003_insert_algo_v1_data |
| 20251007084943 | create_questions_table |
| 20251007085117 | add_field_name_to_questions |
| 20251007090856 | add_positive_message_to_algo_table |
| 20251007100340 | add_address_to_results |
| 20251007104159 | add_risk_levels_to_algo_table |
| 20251007104438 | add_risk_levels_to_questions |

**Migration en attente:**
- `006_fix_rls_policies.sql` - Non appliquée (fichier local non tracké)

---

## ⚡ Edge Functions Déployées

| Fonction | Version | Status | Description |
|----------|---------|--------|-------------|
| `risk-assessment` | 16 | ACTIVE | Évaluation de risque argile (géocodage + Géorisques API) |
| `calculate-quote` | 6 | ACTIVE | Calcul de devis basé sur l'algorithme |
| `admin-auth` | 3 | ACTIVE | Authentification admin |
| `admin-stats` | 8 | ACTIVE | Agrégation de statistiques pour le dashboard |
| `admin-stats-test` | 2 | ACTIVE | Tests des statistiques admin |
| `admin-evaluations` | 2 | ACTIVE | Gestion des évaluations clients |

**Total:** 6 Edge Functions actives

---

## 🔒 Politiques RLS (Row Level Security)

### Table: algo_table
- ✅ RLS activé
- `algo_select_all` (SELECT) - Lecture publique

### Table: price_book
- ✅ RLS activé
- `price_book_select_all` (SELECT) - Lecture publique

### Table: questions
- ✅ RLS activé
- `Questions are viewable by everyone` (SELECT) - Lecture publique

### Table: results
- ✅ RLS activé
- `results_insert_any` (INSERT) - Insertion pour tous
- `results_select_own` (SELECT) - Lecture de ses propres résultats ou anonymes

### Table: risk_assessments
- ✅ RLS activé
- `Allow anonymous risk assessment inserts` (INSERT) - Insertion anonyme
- `Allow reading aggregated statistics` (SELECT) - Lecture publique

### Table: users
- ✅ RLS activé
- `users_insert_any` (INSERT) - Insertion pour tous
- `users_select_own` (SELECT) - Lecture de son propre profil
- `users_update_own` (UPDATE) - Mise à jour de son profil ou profils anonymes

---

## 📐 Schéma des Relations

```
users (id)
  ↓ FK
results (user_id)
  - Lié à algo_table via rule_set_version
  - Lié à price_book via rule_set_version
  - Lié à questions via rule_set_version

algo_table ←→ questions (via rule_set_version, bloc)
algo_table ←→ price_book (via rule_set_version)

risk_assessments (table indépendante)
```

---

## 🎯 Types Personnalisés (ENUM)

### contact_mode_enum
Utilisé dans `users.contact_mode`
- `phone` - Contact par téléphone
- `email` - Contact par email
- `gmail` - Connexion Gmail
- `google` - Connexion Google OAuth
- `linkedin` - Connexion LinkedIn
- `apple` - Connexion Apple

### input_type_enum
Utilisé dans `questions.input_type`
- `boolean` - Input Oui/Non, checkbox
- `numeric` - Valeur numérique
- `select` - Liste déroulante/radio

---

## 📝 Notes Importantes

1. **Versioning:** Le système utilise `rule_set_version` (format: "v1.0") pour versionner les règles, les prix et les questions ensemble.

2. **Anonymat:** Les utilisateurs peuvent créer des devis sans authentification. Les politiques RLS permettent les insertions anonymes.

3. **Immuabilité:** Les règles de `algo_table` et les prix de `price_book` sont conçus comme immuables pour la version v1.0.

4. **Multicanal:** Le système supporte plusieurs modes de contact (email, téléphone, OAuth Google/Apple).

5. **Flexibilité:** Usage intensif de JSONB pour `metadata`, `answers_json`, `contributions_json`, et `options_json` pour permettre une évolution flexible du schéma.

6. **Performance:** Indexes stratégiques sur toutes les tables pour optimiser les requêtes fréquentes (recherche par date, par utilisateur, par version, etc.).

---

**Document généré automatiquement via Supabase MCP**
**Projet TerraStab - Base de données de production**
