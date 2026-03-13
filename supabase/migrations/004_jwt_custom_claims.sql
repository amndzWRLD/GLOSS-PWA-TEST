-- Function to set custom JWT claims
CREATE OR REPLACE FUNCTION set_custom_claims(user_id UUID, claims JSONB)
RETURNS VOID AS $$
BEGIN
  UPDATE auth.users
  SET raw_app_meta_data = raw_app_meta_data || claims
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user role for JWT
CREATE OR REPLACE FUNCTION get_user_role(user_id UUID)
RETURNS TEXT AS $$
  SELECT role::TEXT FROM profiles WHERE id = user_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- Function to add role to JWT claims automatically
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'customer');
  
  -- Set custom claims in JWT
  PERFORM set_custom_claims(
    NEW.id,
    jsonb_build_object(
      'role', 'customer',
      'email', NEW.email
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users to create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update JWT claims when role changes
CREATE OR REPLACE FUNCTION update_user_claims()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    PERFORM set_custom_claims(
      NEW.id,
      jsonb_build_object('role', NEW.role::TEXT)
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_profile_role_updated
  AFTER UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_user_claims();
