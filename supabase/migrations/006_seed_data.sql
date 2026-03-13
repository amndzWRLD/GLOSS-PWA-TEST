-- Seed service categories
INSERT INTO service_categories (name, slug, description, display_order) VALUES
  ('Lavado', 'lavado', 'Lavado exterior e interior básico', 1),
  ('Full Detail', 'full-detail', 'Detallado completo interior y exterior', 2),
  ('Pulido', 'pulido', 'Pulido y corrección de pintura', 3),
  ('Ceramic Coating', 'ceramic', 'Protección cerámica profesional', 4),
  ('PPF', 'ppf', 'Paint Protection Film', 5),
  ('Motor', 'motor', 'Limpieza de motor', 6);

-- Note: User data will be created through the application
-- This is just the base structure
