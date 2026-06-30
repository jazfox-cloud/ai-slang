CREATE TABLE IF NOT EXISTS slangs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  word TEXT NOT NULL UNIQUE,
  definition TEXT NOT NULL,
  origin TEXT,
  examples_json TEXT NOT NULL DEFAULT '[]',
  ai_grade INTEGER DEFAULT 3 CHECK (ai_grade BETWEEN 1 AND 5),
  search_count INTEGER DEFAULT 0,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_slangs_ai_grade ON slangs(ai_grade);
CREATE INDEX IF NOT EXISTS idx_slangs_created_at ON slangs(created_at);
CREATE INDEX IF NOT EXISTS idx_slangs_search_count ON slangs(search_count);

CREATE TABLE IF NOT EXISTS analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL,
  target_key TEXT NOT NULL,
  hit_count INTEGER DEFAULT 1,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(event_type, target_key)
);

-- Search event example:
-- INSERT INTO analytics (event_type, target_key, hit_count)
-- VALUES ('search', ?, 1)
-- ON CONFLICT(event_type, target_key)
-- DO UPDATE SET hit_count = hit_count + 1, updated_at = CURRENT_TIMESTAMP;
