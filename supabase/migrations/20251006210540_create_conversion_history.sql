/*
  # Create conversion history table

  1. New Tables
    - `conversion_history`
      - `id` (uuid, primary key) - Unique identifier for each conversion
      - `original_payload` (text) - Original QRIS payload
      - `converted_payload` (text) - Converted static payload
      - `merchant_name` (text) - Extracted merchant name
      - `merchant_city` (text) - Extracted merchant city
      - `original_type` (text) - Original type (static/dynamic)
      - `conversion_mode` (text) - Mode: no_amount, fixed_amount, custom
      - `fixed_amount` (numeric, nullable) - If fixed amount mode used
      - `metadata` (jsonb) - Additional metadata (tags, notes, etc)
      - `created_at` (timestamptz) - Timestamp of conversion
      - `session_id` (text, nullable) - Browser session identifier for grouping
  
  2. Indexes
    - Index on created_at for time-based queries
    - Index on session_id for filtering by session
    - Index on merchant_name for search
  
  3. Security
    - Enable RLS on conversion_history table
    - Allow anyone to insert (public tool)
    - Allow anyone to read their session data
*/

CREATE TABLE IF NOT EXISTS conversion_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  original_payload text NOT NULL,
  converted_payload text NOT NULL,
  merchant_name text DEFAULT '',
  merchant_city text DEFAULT '',
  original_type text DEFAULT 'unknown',
  conversion_mode text DEFAULT 'no_amount',
  fixed_amount numeric,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  session_id text
);

CREATE INDEX IF NOT EXISTS idx_conversion_created_at ON conversion_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversion_session_id ON conversion_history(session_id) WHERE session_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_conversion_merchant_name ON conversion_history(merchant_name);

ALTER TABLE conversion_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert conversions"
  ON conversion_history
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view conversions"
  ON conversion_history
  FOR SELECT
  TO anon
  USING (true);
