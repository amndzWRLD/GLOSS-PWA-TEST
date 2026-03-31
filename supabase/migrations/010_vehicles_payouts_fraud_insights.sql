-- ============================================
-- VEHICLES
-- ============================================

CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  make TEXT NOT NULL,           -- Toyota, BMW, etc.
  model TEXT NOT NULL,          -- Corolla, M3, etc.
  year INTEGER NOT NULL,
  color TEXT,
  license_plate TEXT,
  vin TEXT UNIQUE,
  vehicle_type TEXT DEFAULT 'sedan', -- sedan, suv, truck, motorcycle, van
  size TEXT DEFAULT 'medium',        -- small, medium, large, xl
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_vehicles_owner ON vehicles(owner_id);

ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view their own vehicles"
  ON vehicles FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can insert their own vehicles"
  ON vehicles FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their own vehicles"
  ON vehicles FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete their own vehicles"
  ON vehicles FOR DELETE
  USING (auth.uid() = owner_id);

CREATE POLICY "Admins can view all vehicles"
  ON vehicles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Add vehicle reference to bookings
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS vehicle_id UUID REFERENCES vehicles(id);

CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ============================================
-- PAYOUTS
-- ============================================

CREATE TYPE payout_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'cancelled');

CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  detailer_id UUID REFERENCES detailer_profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,              -- amount in colones
  currency TEXT DEFAULT 'CRC',
  status payout_status DEFAULT 'pending',
  platform_fee INTEGER NOT NULL,        -- 15% commission
  net_amount INTEGER NOT NULL,          -- amount after fee
  payment_method TEXT,                  -- 'bank_transfer', 'sinpe'
  bank_account TEXT,
  reference_id TEXT,                    -- external transaction ref
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  completed_bookings INTEGER DEFAULT 0,
  notes TEXT,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payouts_detailer ON payouts(detailer_id);
CREATE INDEX idx_payouts_status ON payouts(status);
CREATE INDEX idx_payouts_period ON payouts(period_start, period_end);

ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Detailers can view their own payouts"
  ON payouts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM detailer_profiles
      WHERE id = detailer_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all payouts"
  ON payouts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE TRIGGER update_payouts_updated_at BEFORE UPDATE ON payouts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ============================================
-- FRAUD DETECTION
-- ============================================

CREATE TYPE fraud_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE fraud_status AS ENUM ('open', 'reviewing', 'resolved', 'false_positive');

-- Risk scores per user
CREATE TABLE user_risk_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  last_calculated_at TIMESTAMPTZ DEFAULT NOW(),
  factors JSONB,   -- breakdown of what contributed to the score
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_risk_scores_user ON user_risk_scores(user_id);
CREATE INDEX idx_risk_scores_score ON user_risk_scores(score DESC);

ALTER TABLE user_risk_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage risk scores"
  ON user_risk_scores FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Fraud events (raw suspicious activity log)
CREATE TABLE fraud_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,   -- 'multiple_failed_logins', 'unusual_booking_pattern', 'payment_anomaly'
  severity fraud_severity DEFAULT 'low',
  ip_address INET,
  user_agent TEXT,
  metadata JSONB,             -- event-specific data
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_fraud_events_user ON fraud_events(user_id);
CREATE INDEX idx_fraud_events_type ON fraud_events(event_type);
CREATE INDEX idx_fraud_events_severity ON fraud_events(severity);
CREATE INDEX idx_fraud_events_created ON fraud_events(created_at DESC);

ALTER TABLE fraud_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all fraud events"
  ON fraud_events FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Fraud flags (actionable alerts raised from events)
CREATE TABLE fraud_flags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  fraud_event_id UUID REFERENCES fraud_events(id) ON DELETE SET NULL,
  flag_type TEXT NOT NULL,    -- 'account_suspended', 'payment_blocked', 'manual_review'
  severity fraud_severity DEFAULT 'medium',
  status fraud_status DEFAULT 'open',
  description TEXT,
  resolved_by UUID REFERENCES profiles(id),
  resolved_at TIMESTAMPTZ,
  resolution_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_fraud_flags_user ON fraud_flags(user_id);
CREATE INDEX idx_fraud_flags_status ON fraud_flags(status);
CREATE INDEX idx_fraud_flags_severity ON fraud_flags(severity);

ALTER TABLE fraud_flags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage all fraud flags"
  ON fraud_flags FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE TRIGGER update_fraud_flags_updated_at BEFORE UPDATE ON fraud_flags
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_risk_scores_updated_at BEFORE UPDATE ON user_risk_scores
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ============================================
-- INSIGHTS
-- ============================================

CREATE TYPE insight_level AS ENUM ('rule_based', 'dynamic', 'ai_generated');
CREATE TYPE insight_status AS ENUM ('active', 'dismissed', 'acted_on');

CREATE TABLE insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  detailer_id UUID REFERENCES detailer_profiles(id) ON DELETE CASCADE,
  level insight_level DEFAULT 'rule_based',
  status insight_status DEFAULT 'active',
  category TEXT NOT NULL,     -- 'revenue', 'bookings', 'conversion', 'rating', 'service'
  title TEXT NOT NULL,
  body TEXT NOT NULL,         -- human-readable recommendation
  metric_key TEXT,            -- e.g. 'conversion_rate', 'avg_revenue'
  metric_value DECIMAL,
  metric_change DECIMAL,      -- % change vs previous period
  action_url TEXT,            -- deep link to relevant dashboard section
  metadata JSONB,
  expires_at TIMESTAMPTZ,
  dismissed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_insights_detailer ON insights(detailer_id);
CREATE INDEX idx_insights_status ON insights(status);
CREATE INDEX idx_insights_category ON insights(category);
CREATE INDEX idx_insights_created ON insights(created_at DESC);

ALTER TABLE insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Detailers can view their own insights"
  ON insights FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM detailer_profiles
      WHERE id = detailer_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Detailers can update their own insights"
  ON insights FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM detailer_profiles
      WHERE id = detailer_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all insights"
  ON insights FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE TRIGGER update_insights_updated_at BEFORE UPDATE ON insights
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
