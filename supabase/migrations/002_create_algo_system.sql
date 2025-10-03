-- Migration 002: Système d'algorithmes de calcul de devis
-- Tables: USERS, ALGO, PRICE_BOOK, RESULTS

-- =====================================================
-- 1. ENUM pour les modes de contact
-- =====================================================
CREATE TYPE contact_mode_enum AS ENUM (
  'phone',
  'email',
  'gmail',
  'google',
  'linkedin',
  'apple'
);

-- =====================================================
-- 2. Table USERS — Profils et modes de contact
-- =====================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_mode contact_mode_enum NOT NULL,
  phone TEXT,
  email TEXT,
  external_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_login TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,

  -- Contraintes de validation
  CONSTRAINT phone_required_if_phone_mode CHECK (
    contact_mode != 'phone' OR phone IS NOT NULL
  ),
  CONSTRAINT email_required_if_email_mode CHECK (
    contact_mode NOT IN ('email', 'gmail') OR email IS NOT NULL
  ),
  CONSTRAINT external_id_required_if_external_mode CHECK (
    contact_mode NOT IN ('google', 'linkedin', 'apple') OR external_id IS NOT NULL
  )
);

-- Index pour recherche rapide
CREATE INDEX idx_users_email ON users(email) WHERE email IS NOT NULL;
CREATE INDEX idx_users_phone ON users(phone) WHERE phone IS NOT NULL;
CREATE INDEX idx_users_external_id ON users(external_id) WHERE external_id IS NOT NULL;

-- =====================================================
-- 3. Table ALGO — Définition des règles de calcul
-- =====================================================
CREATE TABLE algo_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_set_version TEXT NOT NULL,
  bloc TEXT NOT NULL,
  question TEXT NOT NULL,
  condition TEXT NOT NULL,
  nbr_sonde TEXT NOT NULL,
  nbr_sonde_double TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Index composite pour recherche par version
  CONSTRAINT unique_algo_rule UNIQUE (rule_set_version, bloc, condition)
);

CREATE INDEX idx_algo_rule_set_version ON algo_table(rule_set_version);
CREATE INDEX idx_algo_bloc ON algo_table(bloc);

-- =====================================================
-- 4. Table PRICE_BOOK — Prix unitaires
-- =====================================================
CREATE TABLE price_book (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_set_version TEXT NOT NULL,
  item_type TEXT NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
  currency TEXT NOT NULL DEFAULT 'EUR',
  effective_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Un seul prix par type de matériel pour une version donnée
  CONSTRAINT unique_price_per_version UNIQUE (rule_set_version, item_type)
);

CREATE INDEX idx_price_book_rule_set_version ON price_book(rule_set_version);
CREATE INDEX idx_price_book_item_type ON price_book(item_type);

-- =====================================================
-- 5. Table RESULTS — Enregistrement des études et devis
-- =====================================================
CREATE TABLE results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('faible', 'moyen', 'fort')),
  rule_set_version TEXT NOT NULL,
  answers_json JSONB NOT NULL,
  contributions_json JSONB,
  nbr_sonde INTEGER NOT NULL DEFAULT 0 CHECK (nbr_sonde >= 0),
  nbr_sonde_double INTEGER NOT NULL DEFAULT 0 CHECK (nbr_sonde_double >= 0),
  nbr_piquet_irrigation INTEGER NOT NULL DEFAULT 0 CHECK (nbr_piquet_irrigation >= 0),
  nbr_controller INTEGER NOT NULL DEFAULT 0 CHECK (nbr_controller >= 0),
  devis_total NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (devis_total >= 0),
  quote_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Foreign Keys
  CONSTRAINT fk_results_user FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE SET NULL,

  -- Note: Les FK vers algo_table et price_book ne sont pas créées
  -- car rule_set_version n'est pas une PK unique dans ces tables
  -- La validation se fera en applicatif
  CONSTRAINT valid_rule_set_version CHECK (rule_set_version ~ '^v[0-9]+\.[0-9]+$')
);

CREATE INDEX idx_results_user_id ON results(user_id);
CREATE INDEX idx_results_rule_set_version ON results(rule_set_version);
CREATE INDEX idx_results_risk_level ON results(risk_level);
CREATE INDEX idx_results_created_at ON results(created_at DESC);
CREATE INDEX idx_results_quote_id ON results(quote_id) WHERE quote_id IS NOT NULL;

-- =====================================================
-- 6. Row Level Security (RLS) - Optionnel mais recommandé
-- =====================================================
-- Activer RLS sur toutes les tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE algo_table ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_book ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

-- Politique: Les utilisateurs authentifiés peuvent lire leur propre profil
CREATE POLICY users_select_own ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Politique: Tout le monde peut lire ALGO (lecture publique)
CREATE POLICY algo_select_all ON algo_table
  FOR SELECT
  USING (true);

-- Politique: Tout le monde peut lire PRICE_BOOK (lecture publique)
CREATE POLICY price_book_select_all ON price_book
  FOR SELECT
  USING (true);

-- Politique: Les utilisateurs peuvent lire leurs propres résultats
CREATE POLICY results_select_own ON results
  FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Politique: Les utilisateurs peuvent insérer leurs propres résultats
CREATE POLICY results_insert_own ON results
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- =====================================================
-- 7. Commentaires sur les tables
-- =====================================================
COMMENT ON TABLE users IS 'Profils utilisateurs avec modes de contact multiples';
COMMENT ON TABLE algo_table IS 'Règles de calcul versionnées pour les algorithmes de devis';
COMMENT ON TABLE price_book IS 'Prix unitaires par version d''algorithme';
COMMENT ON TABLE results IS 'Enregistrement complet des études et devis générés';

COMMENT ON COLUMN results.risk_level IS 'Niveau de risque: faible, moyen, ou fort';
COMMENT ON COLUMN results.answers_json IS 'Réponses brutes de l''utilisateur';
COMMENT ON COLUMN results.contributions_json IS 'Détail des contributions par bloc';
COMMENT ON COLUMN results.quote_id IS 'Identifiant unique lisible du devis';
