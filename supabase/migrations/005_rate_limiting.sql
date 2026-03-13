-- Rate limiting table
CREATE TABLE rate_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  ip_address INET,
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_rate_limits_user ON rate_limits(user_id, endpoint, window_start);
CREATE INDEX idx_rate_limits_ip ON rate_limits(ip_address, endpoint, window_start);

-- Function to check rate limit
CREATE OR REPLACE FUNCTION check_rate_limit(
  p_user_id UUID,
  p_ip_address INET,
  p_endpoint TEXT,
  p_max_requests INTEGER DEFAULT 100,
  p_window_minutes INTEGER DEFAULT 1
)
RETURNS BOOLEAN AS $$
DECLARE
  v_count INTEGER;
  v_window_start TIMESTAMPTZ;
BEGIN
  v_window_start := NOW() - (p_window_minutes || ' minutes')::INTERVAL;
  
  -- Count requests in current window
  SELECT COALESCE(SUM(request_count), 0) INTO v_count
  FROM rate_limits
  WHERE (user_id = p_user_id OR ip_address = p_ip_address)
    AND endpoint = p_endpoint
    AND window_start > v_window_start;
  
  -- If limit exceeded, return false
  IF v_count >= p_max_requests THEN
    RETURN FALSE;
  END IF;
  
  -- Record this request
  INSERT INTO rate_limits (user_id, ip_address, endpoint, window_start)
  VALUES (p_user_id, p_ip_address, p_endpoint, NOW())
  ON CONFLICT (user_id, endpoint, window_start)
  DO UPDATE SET request_count = rate_limits.request_count + 1;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Cleanup old rate limit records (run periodically)
CREATE OR REPLACE FUNCTION cleanup_rate_limits()
RETURNS VOID AS $$
BEGIN
  DELETE FROM rate_limits
  WHERE window_start < NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Different rate limits for different endpoints
CREATE TABLE rate_limit_config (
  endpoint TEXT PRIMARY KEY,
  max_requests INTEGER NOT NULL,
  window_minutes INTEGER NOT NULL,
  description TEXT
);

INSERT INTO rate_limit_config (endpoint, max_requests, window_minutes, description) VALUES
  ('auth/login', 5, 15, 'Login attempts'),
  ('auth/signup', 3, 60, 'Signup attempts'),
  ('bookings/create', 10, 60, 'Booking creation'),
  ('api/*', 100, 1, 'General API calls'),
  ('search/*', 50, 1, 'Search queries');
