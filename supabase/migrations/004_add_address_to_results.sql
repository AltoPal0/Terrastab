-- Migration 004: Ajouter la colonne address à la table results
-- Cette colonne stockera l'adresse utilisée lors de l'évaluation du risque

ALTER TABLE results
ADD COLUMN address TEXT;

-- Index pour faciliter les recherches par adresse
CREATE INDEX idx_results_address ON results(address);

-- Commentaire sur la colonne
COMMENT ON COLUMN results.address IS 'Adresse saisie par l''utilisateur lors du survey';
