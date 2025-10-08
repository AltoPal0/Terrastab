-- Migration 006: Corriger les politiques RLS pour permettre les opérations anonymes

-- =====================================================
-- USERS TABLE - Permettre insertion anonyme
-- =====================================================

-- Drop les politiques existantes problématiques
DROP POLICY IF EXISTS users_insert_own ON users;
DROP POLICY IF EXISTS users_insert_anonymous ON users;

-- Nouvelle politique: Permettre TOUTES les insertions (auth ou anonymous)
-- Car on a besoin de créer des utilisateurs avant qu'ils ne se connectent
CREATE POLICY users_insert_any ON users
  FOR INSERT
  WITH CHECK (true);

-- Politique: Les utilisateurs peuvent mettre à jour leur propre profil OU les profils anonymes
DROP POLICY IF EXISTS users_update_own ON users;
CREATE POLICY users_update_own ON users
  FOR UPDATE
  USING (auth.uid() = auth_user_id OR auth_user_id IS NULL);

-- =====================================================
-- RESULTS TABLE - Permettre insertion anonyme
-- =====================================================

-- Drop les politiques existantes
DROP POLICY IF EXISTS results_insert_own ON results;

-- Nouvelle politique: Permettre insertion pour utilisateurs connectés OU anonymes
CREATE POLICY results_insert_any ON results
  FOR INSERT
  WITH CHECK (true);

-- Améliorer la politique de lecture pour inclure les résultats anonymes
DROP POLICY IF EXISTS results_select_own ON results;
CREATE POLICY results_select_own ON results
  FOR SELECT
  USING (
    user_id IS NULL OR
    user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()) OR
    auth.uid() IS NULL
  );

-- =====================================================
-- COMMENTAIRES
-- =====================================================

COMMENT ON POLICY users_insert_any ON users IS 'Permet la création de profils utilisateurs pour auth et anonymous';
COMMENT ON POLICY results_insert_any ON results IS 'Permet la création de devis pour utilisateurs connectés et anonymes';
