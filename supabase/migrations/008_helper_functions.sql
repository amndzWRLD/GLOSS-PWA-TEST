-- Function to calculate distance between two points (Haversine formula)
CREATE OR REPLACE FUNCTION calculate_distance(
  lat1 DECIMAL,
  lng1 DECIMAL,
  lat2 DECIMAL,
  lng2 DECIMAL
)
RETURNS DECIMAL AS $$
DECLARE
  earth_radius DECIMAL := 6371; -- km
  dlat DECIMAL;
  dlng DECIMAL;
  a DECIMAL;
  c DECIMAL;
BEGIN
  dlat := radians(lat2 - lat1);
  dlng := radians(lng2 - lng1);
  
  a := sin(dlat/2) * sin(dlat/2) +
       cos(radians(lat1)) * cos(radians(lat2)) *
       sin(dlng/2) * sin(dlng/2);
  
  c := 2 * atan2(sqrt(a), sqrt(1-a));
  
  RETURN earth_radius * c;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to find nearby detailers
CREATE OR REPLACE FUNCTION find_nearby_detailers(
  user_lat DECIMAL,
  user_lng DECIMAL,
  radius_km INTEGER DEFAULT 10,
  category_slug TEXT DEFAULT NULL
)
RETURNS TABLE (
  detailer_id UUID,
  business_name TEXT,
  rating DECIMAL,
  total_reviews INTEGER,
  distance_km DECIMAL,
  min_price INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    dp.id,
    dp.business_name,
    dp.rating,
    dp.total_reviews,
    calculate_distance(user_lat, user_lng, p.location_lat, p.location_lng) as distance_km,
    MIN(s.price_min) as min_price
  FROM detailer_profiles dp
  JOIN profiles p ON dp.user_id = p.id
  LEFT JOIN services s ON s.detailer_id = dp.id
  LEFT JOIN service_categories sc ON s.category_id = sc.id
  WHERE
    dp.available = true AND
    dp.verified = true AND
    calculate_distance(user_lat, user_lng, p.location_lat, p.location_lng) <= radius_km AND
    (category_slug IS NULL OR sc.slug = category_slug)
  GROUP BY dp.id, dp.business_name, dp.rating, dp.total_reviews, p.location_lat, p.location_lng
  ORDER BY distance_km ASC;
END;
$$ LANGUAGE plpgsql;

-- Function to update detailer rating after review
CREATE OR REPLACE FUNCTION update_detailer_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE detailer_profiles
  SET
    rating = (
      SELECT ROUND(AVG(rating)::numeric, 1)
      FROM reviews
      WHERE detailer_id = NEW.detailer_id
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM reviews
      WHERE detailer_id = NEW.detailer_id
    )
  WHERE id = NEW.detailer_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rating_after_review
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_detailer_rating();

-- Function to update total services count
CREATE OR REPLACE FUNCTION update_detailer_service_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE detailer_profiles
    SET total_services = total_services + 1
    WHERE id = NEW.detailer_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE detailer_profiles
    SET total_services = total_services - 1
    WHERE id = OLD.detailer_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_service_count
  AFTER INSERT OR DELETE ON bookings
  FOR EACH ROW
  WHEN (NEW.status = 'completed' OR OLD.status = 'completed')
  EXECUTE FUNCTION update_detailer_service_count();

-- Function to prevent double booking
CREATE OR REPLACE FUNCTION check_booking_availability()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM bookings
    WHERE detailer_id = NEW.detailer_id
      AND scheduled_date = NEW.scheduled_date
      AND scheduled_time = NEW.scheduled_time
      AND status NOT IN ('cancelled', 'completed')
      AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
  ) THEN
    RAISE EXCEPTION 'Detailer already has a booking at this time';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_booking_conflict
  BEFORE INSERT OR UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION check_booking_availability();

-- Function to get detailer monthly earnings
CREATE OR REPLACE FUNCTION get_monthly_earnings(
  p_detailer_id UUID,
  p_year INTEGER DEFAULT EXTRACT(YEAR FROM NOW()),
  p_month INTEGER DEFAULT EXTRACT(MONTH FROM NOW())
)
RETURNS TABLE (
  total_earnings INTEGER,
  completed_bookings INTEGER,
  pending_amount INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(SUM(CASE WHEN p.status = 'completed' THEN p.amount ELSE 0 END), 0)::INTEGER as total_earnings,
    COUNT(CASE WHEN b.status = 'completed' THEN 1 END)::INTEGER as completed_bookings,
    COALESCE(SUM(CASE WHEN p.status = 'pending' THEN p.amount ELSE 0 END), 0)::INTEGER as pending_amount
  FROM bookings b
  LEFT JOIN payments p ON p.booking_id = b.id
  WHERE
    b.detailer_id = p_detailer_id AND
    EXTRACT(YEAR FROM b.scheduled_date) = p_year AND
    EXTRACT(MONTH FROM b.scheduled_date) = p_month;
END;
$$ LANGUAGE plpgsql;
