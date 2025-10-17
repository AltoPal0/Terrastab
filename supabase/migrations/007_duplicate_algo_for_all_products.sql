-- Migration 007: Dupliquer les données d'algorithme v1.0 pour Survey+ et Shield
-- Objectif: Créer des versions indépendantes de l'algorithme pour chaque produit

-- =====================================================
-- 1. Dupliquer les questions pour Survey+ (version v1.0-survey-plus)
-- =====================================================

INSERT INTO questions (
  bloc,
  rule_set_version,
  question_text,
  info_text,
  input_type,
  options_json,
  order_index,
  field_name,
  risk_levels
)
SELECT
  bloc,
  'v1.0-survey-plus' as rule_set_version,
  question_text,
  info_text,
  input_type,
  options_json,
  order_index,
  field_name,
  risk_levels
FROM questions
WHERE rule_set_version = 'v1.0';

-- =====================================================
-- 2. Dupliquer les questions pour Shield (version v1.0-shield)
-- =====================================================

INSERT INTO questions (
  bloc,
  rule_set_version,
  question_text,
  info_text,
  input_type,
  options_json,
  order_index,
  field_name,
  risk_levels
)
SELECT
  bloc,
  'v1.0-shield' as rule_set_version,
  question_text,
  info_text,
  input_type,
  options_json,
  order_index,
  field_name,
  risk_levels
FROM questions
WHERE rule_set_version = 'v1.0';

-- =====================================================
-- 3. Dupliquer les règles algo pour Survey+ (version v1.0-survey-plus)
-- =====================================================

INSERT INTO algo_table (
  rule_set_version,
  bloc,
  question,
  condition,
  nbr_sonde,
  nbr_sonde_double,
  note,
  positive_message,
  risk_levels
)
SELECT
  'v1.0-survey-plus' as rule_set_version,
  bloc,
  question,
  condition,
  nbr_sonde,
  nbr_sonde_double,
  note,
  positive_message,
  risk_levels
FROM algo_table
WHERE rule_set_version = 'v1.0';

-- =====================================================
-- 4. Dupliquer les règles algo pour Shield (version v1.0-shield)
-- =====================================================

INSERT INTO algo_table (
  rule_set_version,
  bloc,
  question,
  condition,
  nbr_sonde,
  nbr_sonde_double,
  note,
  positive_message,
  risk_levels
)
SELECT
  'v1.0-shield' as rule_set_version,
  bloc,
  question,
  condition,
  nbr_sonde,
  nbr_sonde_double,
  note,
  positive_message,
  risk_levels
FROM algo_table
WHERE rule_set_version = 'v1.0';

-- =====================================================
-- 5. Dupliquer le price_book pour Survey+ (version v1.0-survey-plus)
-- =====================================================

INSERT INTO price_book (
  rule_set_version,
  item_type,
  unit_price,
  currency,
  effective_at
)
SELECT
  'v1.0-survey-plus' as rule_set_version,
  item_type,
  unit_price,
  currency,
  effective_at
FROM price_book
WHERE rule_set_version = 'v1.0';

-- =====================================================
-- 6. Dupliquer le price_book pour Shield (version v1.0-shield)
-- =====================================================

INSERT INTO price_book (
  rule_set_version,
  item_type,
  unit_price,
  currency,
  effective_at
)
SELECT
  'v1.0-shield' as rule_set_version,
  item_type,
  unit_price,
  currency,
  effective_at
FROM price_book
WHERE rule_set_version = 'v1.0';

-- =====================================================
-- 7. Renommer la version originale pour Survey Light
-- =====================================================

-- Renommer questions
UPDATE questions
SET rule_set_version = 'v1.0-survey-light'
WHERE rule_set_version = 'v1.0';

-- Renommer algo_table
UPDATE algo_table
SET rule_set_version = 'v1.0-survey-light'
WHERE rule_set_version = 'v1.0';

-- Renommer price_book
UPDATE price_book
SET rule_set_version = 'v1.0-survey-light'
WHERE rule_set_version = 'v1.0';

-- =====================================================
-- 8. Commentaires
-- =====================================================

COMMENT ON TABLE questions IS 'Questions dynamiques pour le questionnaire algo, versionnées par rule_set_version et par produit';
COMMENT ON TABLE algo_table IS 'Règles de calcul versionnées pour les algorithmes de devis, par produit (survey-light, survey-plus, shield)';
COMMENT ON TABLE price_book IS 'Prix unitaires par version d''algorithme et par produit';
