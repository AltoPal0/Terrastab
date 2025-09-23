-- Create risk assessments table to store historical risk checks
CREATE TABLE IF NOT EXISTS risk_assessments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- User provided data
  input_address text NOT NULL,

  -- Geocoding results
  formatted_address text,
  latitude decimal(10, 8),
  longitude decimal(11, 8),

  -- Risk assessment results
  risk_level text NOT NULL CHECK (risk_level IN ('Faible', 'Moyen', 'Élevé')),
  risk_color text NOT NULL,
  risk_width text NOT NULL,
  risk_description text NOT NULL,
  commune text,
  original_exposition text,

  -- Metadata
  geocoding_success boolean DEFAULT false,
  georisques_success boolean DEFAULT false,
  error_message text,

  -- Analytics
  ip_address inet,
  user_agent text,

  -- Indexes for performance
  CONSTRAINT valid_coordinates CHECK (
    (latitude IS NULL AND longitude IS NULL) OR
    (latitude IS NOT NULL AND longitude IS NOT NULL)
  )
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_risk_assessments_created_at ON risk_assessments(created_at);
CREATE INDEX IF NOT EXISTS idx_risk_assessments_risk_level ON risk_assessments(risk_level);
CREATE INDEX IF NOT EXISTS idx_risk_assessments_commune ON risk_assessments(commune);
CREATE INDEX IF NOT EXISTS idx_risk_assessments_coordinates ON risk_assessments(latitude, longitude);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON risk_assessments
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_timestamp();

-- Create RLS policies (if needed in the future)
-- For now, we'll allow anonymous access for the public risk assessment feature
ALTER TABLE risk_assessments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for risk assessments
CREATE POLICY "Allow anonymous risk assessment inserts" ON risk_assessments
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow reading of aggregated statistics (optional, for analytics)
CREATE POLICY "Allow reading aggregated statistics" ON risk_assessments
  FOR SELECT
  TO anon
  USING (true);

-- Create a view for analytics/statistics (optional)
CREATE OR REPLACE VIEW risk_assessment_stats AS
SELECT
  risk_level,
  COUNT(*) as assessment_count,
  COUNT(*) FILTER (WHERE geocoding_success = true) as successful_geocoding,
  COUNT(*) FILTER (WHERE georisques_success = true) as successful_risk_checks,
  DATE_TRUNC('day', created_at) as assessment_date
FROM risk_assessments
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY risk_level, DATE_TRUNC('day', created_at)
ORDER BY assessment_date DESC, risk_level;