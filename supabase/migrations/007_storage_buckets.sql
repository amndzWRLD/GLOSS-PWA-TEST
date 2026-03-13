-- Create storage buckets for media files
INSERT INTO storage.buckets (id, name, public) VALUES
  ('avatars', 'avatars', true),
  ('service-photos', 'service-photos', true),
  ('review-photos', 'review-photos', true),
  ('booking-photos', 'booking-photos', true);

-- Storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for service photos
CREATE POLICY "Service photos are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'service-photos');

CREATE POLICY "Detailers can upload service photos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'service-photos' AND
    EXISTS (
      SELECT 1 FROM detailer_profiles
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Detailers can update their service photos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'service-photos' AND
    EXISTS (
      SELECT 1 FROM detailer_profiles
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Detailers can delete their service photos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'service-photos' AND
    EXISTS (
      SELECT 1 FROM detailer_profiles
      WHERE user_id = auth.uid()
    )
  );

-- Storage policies for review photos
CREATE POLICY "Review photos are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'review-photos');

CREATE POLICY "Users can upload review photos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'review-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their review photos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'review-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for booking photos
CREATE POLICY "Booking photos are accessible to involved parties"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'booking-photos' AND (
      auth.uid()::text = (storage.foldername(name))[1] OR
      EXISTS (
        SELECT 1 FROM detailer_profiles
        WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can upload booking photos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'booking-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their booking photos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'booking-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
