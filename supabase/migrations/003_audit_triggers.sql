-- Audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    INSERT INTO audit_logs (user_id, action, resource_type, resource_id, old_data, ip_address)
    VALUES (
      auth.uid(),
      'delete',
      TG_TABLE_NAME,
      OLD.id,
      row_to_json(OLD),
      inet_client_addr()
    );
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO audit_logs (user_id, action, resource_type, resource_id, old_data, new_data, ip_address)
    VALUES (
      auth.uid(),
      'update',
      TG_TABLE_NAME,
      NEW.id,
      row_to_json(OLD),
      row_to_json(NEW),
      inet_client_addr()
    );
    RETURN NEW;
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO audit_logs (user_id, action, resource_type, resource_id, new_data, ip_address)
    VALUES (
      auth.uid(),
      'create',
      TG_TABLE_NAME,
      NEW.id,
      row_to_json(NEW),
      inet_client_addr()
    );
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply audit triggers to critical tables
CREATE TRIGGER audit_profiles
  AFTER INSERT OR UPDATE OR DELETE ON profiles
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_detailer_profiles
  AFTER INSERT OR UPDATE OR DELETE ON detailer_profiles
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_bookings
  AFTER INSERT OR UPDATE OR DELETE ON bookings
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_payments
  AFTER INSERT OR UPDATE OR DELETE ON payments
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_reviews
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_media
  AFTER INSERT OR UPDATE OR DELETE ON media
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- Auth event logging function
CREATE OR REPLACE FUNCTION log_auth_event()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (user_id, action, resource_type, resource_id, new_data, ip_address)
  VALUES (
    NEW.id,
    CASE
      WHEN TG_OP = 'INSERT' THEN 'signup'
      WHEN NEW.last_sign_in_at > OLD.last_sign_in_at THEN 'login'
      ELSE 'auth_update'
    END,
    'auth',
    NEW.id,
    jsonb_build_object(
      'email', NEW.email,
      'last_sign_in_at', NEW.last_sign_in_at
    ),
    NEW.last_sign_in_at::text::inet
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auth events (requires access to auth.users)
-- Note: This needs to be run with superuser privileges
-- CREATE TRIGGER audit_auth_events
--   AFTER INSERT OR UPDATE ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION log_auth_event();
