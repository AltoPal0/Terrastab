-- Migration 003: Insertion des données initiales
-- ALGO v1.0 (Risque Faible) + PRICE_BOOK v1.0

-- =====================================================
-- 1. Insertion des règles ALGO v1.0 (Risque Faible)
-- =====================================================
INSERT INTO algo_table (rule_set_version, bloc, question, condition, nbr_sonde, nbr_sonde_double, note) VALUES
  -- Bloc 00: Type de logement
  ('v1.0', '00', 'Type de logement', 'Maison mitoyenne', '0', '+2', 'Ajoute 2 sondes doubles forfaitaires'),

  -- Bloc 10: Sous-sol (STOP)
  ('v1.0', '10', 'Sous-sol', 'Oui', 'x0', 'x0', 'Stop : pas de facturation si sous-sol présent'),

  -- Bloc 20: Année de construction (STOP)
  ('v1.0', '20', 'Année de construction', '≥2000', 'x0', 'x0', 'Stop : pas de facturation pour maisons récentes'),

  -- Bloc 30: Surface
  ('v1.0', '30', 'Surface', 'Par tranche de 200 m²', '+1 par tranche', '0', 'Chaque tranche ajoute 1 sonde'),
  ('v1.0', '30', 'Surface', 'Toujours', '0', '+1', 'Ajoute une sonde double fixe'),

  -- Bloc 40: Murs sans terrasse (STOP si 0)
  ('v1.0', '40', 'Murs sans terrasse', '=0', 'x0', 'x0', 'Stop : pas de facturation si aucun mur sans terrasse'),
  ('v1.0', '40', 'Murs sans terrasse', '>0', '+1 par mur', '0', 'Chaque mur sans terrasse ajoute 1 sonde'),

  -- Bloc 50: Zones vertes
  ('v1.0', '50', 'Zones vertes', 'Surveillance = Oui', '+1 par zone', '0', 'Chaque zone verte surveillée ajoute 1 sonde'),
  ('v1.0', '50', 'Zones vertes', 'Surveillance = Non', '0', '0', 'Pas de sonde si zones non surveillées'),

  -- Bloc 70: Extensions
  ('v1.0', '70', 'Extensions', 'Par unité', '+1 par extension', '0', 'Chaque extension ajoute 1 sonde');

-- =====================================================
-- 2. Insertion des prix unitaires PRICE_BOOK v1.0
-- =====================================================
INSERT INTO price_book (rule_set_version, item_type, unit_price, currency, effective_at) VALUES
  ('v1.0', 'sonde', 150.00, 'EUR', '2025-01-01T00:00:00Z'),
  ('v1.0', 'sonde_double', 280.00, 'EUR', '2025-01-01T00:00:00Z'),
  ('v1.0', 'piquet_irrigation', 45.00, 'EUR', '2025-01-01T00:00:00Z'),
  ('v1.0', 'controller', 350.00, 'EUR', '2025-01-01T00:00:00Z');

-- =====================================================
-- 3. Commentaires
-- =====================================================
COMMENT ON TABLE algo_table IS 'Règles ALGO v1.0 insérées pour risque faible. Ces règles sont immuables.';
COMMENT ON TABLE price_book IS 'Prix unitaires v1.0 insérés. Liés à la version v1.0 de l''algorithme.';
