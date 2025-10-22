-- Migration 008: Fix rule_set_version constraint to allow extended version formats
-- Allows formats like: v1.0, v1.0-survey-light, v2.1-shield-premium, etc.
--
-- Rollback: To rollback, restore the original constraint:
-- ALTER TABLE results DROP CONSTRAINT valid_rule_set_version;
-- ALTER TABLE results ADD CONSTRAINT valid_rule_set_version CHECK (rule_set_version ~ '^v[0-9]+\.[0-9]+$');

-- Drop the existing constraint
ALTER TABLE results DROP CONSTRAINT valid_rule_set_version;

-- Add new constraint that allows extended formats with hyphens and alphanumeric suffixes
-- Format: v{major}.{minor} OR v{major}.{minor}-{suffix}
-- Examples: v1.0, v1.0-survey-light, v2.1-shield-premium, v3.0-test-123
ALTER TABLE results ADD CONSTRAINT valid_rule_set_version
  CHECK (rule_set_version ~ '^v[0-9]+\.[0-9]+(-[a-z0-9\-]+)?$');

-- Verify the constraint works by checking a few example formats
-- These are just comments to document expected behavior:
-- VALID: 'v1.0', 'v1.0-survey-light', 'v2.1-shield', 'v3.0-test-123'
-- INVALID: 'v1', '1.0', 'v1.0_test', 'v1.0-CAPS', 'v1.0-'
