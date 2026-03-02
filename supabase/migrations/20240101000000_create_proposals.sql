CREATE TABLE proposals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  source_url TEXT NOT NULL,
  source_name TEXT,
  content TEXT NOT NULL,
  prompt_used TEXT,
  model_used TEXT DEFAULT 'anthropic/claude-opus-4-6',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_proposals_created_at ON proposals(created_at DESC);

ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read"
  ON proposals FOR SELECT USING (true);

CREATE POLICY "Public insert"
  ON proposals FOR INSERT WITH CHECK (true);
