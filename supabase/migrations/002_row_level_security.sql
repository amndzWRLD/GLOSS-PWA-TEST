-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE detailer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES POLICIES
-- ============================================

-- Users can view all profiles (for browsing detailers)
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admins can update any profile
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- DETAILER PROFILES POLICIES
-- ============================================

-- Anyone can view detailer profiles
CREATE POLICY "Detailer profiles are viewable by everyone"
  ON detailer_profiles FOR SELECT
  USING (true);

-- Detailers can insert their own profile
CREATE POLICY "Detailers can insert own profile"
  ON detailer_profiles FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'detailer'
    )
  );

-- Detailers can update their own profile
CREATE POLICY "Detailers can update own profile"
  ON detailer_profiles FOR UPDATE
  USING (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'detailer'
    )
  );

-- Admins can update any detailer profile
CREATE POLICY "Admins can update any detailer profile"
  ON detailer_profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- SERVICE CATEGORIES POLICIES
-- ============================================

-- Anyone can view categories
CREATE POLICY "Categories are viewable by everyone"
  ON service_categories FOR SELECT
  USING (true);

-- Only admins can manage categories
CREATE POLICY "Only admins can manage categories"
  ON service_categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- SERVICES POLICIES
-- ============================================

-- Anyone can view active services
CREATE POLICY "Active services are viewable by everyone"
  ON services FOR SELECT
  USING (active = true OR auth.uid() IN (
    SELECT user_id FROM detailer_profiles WHERE id = detailer_id
  ));

-- Detailers can insert their own services
CREATE POLICY "Detailers can insert own services"
  ON services FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM detailer_profiles
      WHERE id = detailer_id AND user_id = auth.uid()
    )
  );

-- Detailers can update their own services
CREATE POLICY "Detailers can update own services"
  ON services FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM detailer_profiles
      WHERE id = detailer_id AND user_id = auth.uid()
    )
  );

-- Detailers can delete their own services
CREATE POLICY "Detailers can delete own services"
  ON services FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM detailer_profiles
      WHERE id = detailer_id AND user_id = auth.uid()
    )
  );

-- ============================================
-- BOOKINGS POLICIES
-- ============================================

-- Customers can view their own bookings
CREATE POLICY "Customers can view own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = customer_id);

-- Detailers can view their bookings
CREATE POLICY "Detailers can view their bookings"
  ON bookings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM detailer_profiles
      WHERE id = detailer_id AND user_id = auth.uid()
    )
  );

-- Customers can create bookings
CREATE POLICY "Customers can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

-- Customers can update their own pending bookings
CREATE POLICY "Customers can update own pending bookings"
  ON bookings FOR UPDATE
  USING (
    auth.uid() = customer_id AND
    status = 'pending'
  );

-- Detailers can update their bookings
CREATE POLICY "Detailers can update their bookings"
  ON bookings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM detailer_profiles
      WHERE id = detailer_id AND user_id = auth.uid()
    )
  );

-- ============================================
-- REVIEWS POLICIES
-- ============================================

-- Anyone can view reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

-- Customers can create reviews for their completed bookings
CREATE POLICY "Customers can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (
    auth.uid() = customer_id AND
    EXISTS (
      SELECT 1 FROM bookings
      WHERE id = booking_id AND
            customer_id = auth.uid() AND
            status = 'completed'
    )
  );

-- Customers can update their own reviews
CREATE POLICY "Customers can update own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = customer_id);

-- Detailers can add responses to reviews
CREATE POLICY "Detailers can respond to reviews"
  ON reviews FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM detailer_profiles
      WHERE id = detailer_id AND user_id = auth.uid()
    )
  );

-- ============================================
-- PAYMENTS POLICIES
-- ============================================

-- Customers can view their own payments
CREATE POLICY "Customers can view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = customer_id);

-- Detailers can view their payments
CREATE POLICY "Detailers can view their payments"
  ON payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM detailer_profiles
      WHERE id = detailer_id AND user_id = auth.uid()
    )
  );

-- Only system/admin can create payments
CREATE POLICY "Only admins can create payments"
  ON payments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Only system/admin can update payments
CREATE POLICY "Only admins can update payments"
  ON payments FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- AUDIT LOGS POLICIES
-- ============================================

-- Users can view their own audit logs
CREATE POLICY "Users can view own audit logs"
  ON audit_logs FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all audit logs
CREATE POLICY "Admins can view all audit logs"
  ON audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Only system can insert audit logs (via triggers)
CREATE POLICY "System can insert audit logs"
  ON audit_logs FOR INSERT
  WITH CHECK (true);

-- Audit logs are immutable (no updates or deletes)

-- ============================================
-- MEDIA POLICIES
-- ============================================

-- Anyone can view media
CREATE POLICY "Media is viewable by everyone"
  ON media FOR SELECT
  USING (true);

-- Users can upload their own media
CREATE POLICY "Users can upload own media"
  ON media FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Detailers can upload media for their services/bookings
CREATE POLICY "Detailers can upload service media"
  ON media FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM detailer_profiles
      WHERE id = detailer_id AND user_id = auth.uid()
    )
  );

-- Users can delete their own media
CREATE POLICY "Users can delete own media"
  ON media FOR DELETE
  USING (auth.uid() = user_id);

-- Detailers can delete their service media
CREATE POLICY "Detailers can delete service media"
  ON media FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM detailer_profiles
      WHERE id = detailer_id AND user_id = auth.uid()
    )
  );
