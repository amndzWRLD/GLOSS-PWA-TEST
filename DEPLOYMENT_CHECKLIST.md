# GLOSS Supabase Deployment Checklist

## ✅ Pre-Deployment
- [ ] Supabase project created
- [ ] Project credentials copied to `.env` file
- [ ] `.env` file added to `.gitignore`

## 📊 Database Migrations (Run in SQL Editor)

### Migration 1: Initial Schema ✓
**File**: `supabase/migrations/001_initial_schema.sql`
**Creates**: All tables, indexes, triggers
**Status**: [ ] Completed

### Migration 2: Row Level Security
**File**: `supabase/migrations/002_row_level_security.sql`
**Creates**: RLS policies for all tables
**Status**: [ ] Completed

### Migration 3: Audit Triggers
**File**: `supabase/migrations/003_audit_triggers.sql`
**Creates**: Automatic audit logging
**Status**: [ ] Completed

### Migration 4: JWT Custom Claims
**File**: `supabase/migrations/004_jwt_custom_claims.sql`
**Creates**: Role-based JWT tokens
**Status**: [ ] Completed

### Migration 5: Rate Limiting
**File**: `supabase/migrations/005_rate_limiting.sql`
**Creates**: Rate limit functions
**Status**: [ ] Completed

### Migration 6: Seed Data
**File**: `supabase/migrations/006_seed_data.sql`
**Creates**: Initial service categories
**Status**: [ ] Completed

### Migration 7: Storage Buckets
**File**: `supabase/migrations/007_storage_buckets.sql`
**Creates**: File storage buckets and policies
**Status**: [ ] Completed

### Migration 8: Helper Functions
**File**: `supabase/migrations/008_helper_functions.sql`
**Creates**: Business logic functions
**Status**: [ ] Completed

## 🔐 Authentication Setup

### In Supabase Dashboard → Authentication → Settings:
- [ ] Enable Email provider
- [ ] Set JWT expiry to 900 seconds (15 minutes)
- [ ] Enable refresh tokens (7 days)
- [ ] Disable email confirmations (for development)
- [ ] Add site URL: `http://localhost:3000`

### Email Templates (optional):
- [ ] Customize confirmation email
- [ ] Customize password reset email

## 🗄️ Storage Setup

### In Supabase Dashboard → Storage:
Buckets should be auto-created by migration 007, verify:
- [ ] `avatars` bucket exists (public)
- [ ] `service-photos` bucket exists (public)
- [ ] `review-photos` bucket exists (public)
- [ ] `booking-photos` bucket exists (public)

## 🔍 Verification Steps

### Check Tables Created:
1. Go to **Table Editor** in Supabase Dashboard
2. Verify these tables exist:
   - [ ] profiles
   - [ ] detailer_profiles
   - [ ] service_categories
   - [ ] services
   - [ ] bookings
   - [ ] reviews
   - [ ] payments
   - [ ] media
   - [ ] audit_logs
   - [ ] rate_limits

### Check RLS Enabled:
1. Click on any table
2. Look for "RLS enabled" badge
3. Click "Policies" tab to see policies

### Check Seed Data:
1. Go to **Table Editor** → `service_categories`
2. Should see 6 categories: Lavado, Full Detail, Pulido, Ceramic Coating, PPF, Motor

## 🚀 Frontend Connection

### Update Frontend:
- [ ] Copy `.env.example` to `.env`
- [ ] Paste Supabase URL and anon key
- [ ] Restart dev server: `npm run dev`

### Test Authentication:
- [ ] Go to `/signup` and create test account
- [ ] Check if profile created in `profiles` table
- [ ] Try logging in at `/login`
- [ ] Check if JWT token has role claim

## 🧪 Testing Checklist

### User Flow:
- [ ] Signup creates profile with 'customer' role
- [ ] Login returns JWT with role claim
- [ ] Can view home page with detailers
- [ ] Can view detailer profile
- [ ] Can create booking (if logged in)

### Security:
- [ ] Cannot access other users' data
- [ ] Cannot modify other users' profiles
- [ ] Rate limiting works (try 6+ login attempts)
- [ ] Audit logs capture actions

## 📝 Post-Deployment

### Create Test Data:
- [ ] Create test detailer account
- [ ] Add detailer profile
- [ ] Create test services
- [ ] Upload test photos
- [ ] Create test booking

### Monitor:
- [ ] Check **Logs** in Supabase Dashboard
- [ ] Review **Database** → **Roles** for permissions
- [ ] Check **API** → **Logs** for request patterns

## 🔧 Troubleshooting

### Common Issues:

**Migration fails with "relation already exists"**
- Solution: Drop tables and re-run, or skip that statement

**RLS blocks all queries**
- Solution: Check if policies are created correctly
- Verify JWT token has user ID

**Storage upload fails**
- Solution: Check bucket policies in migration 007
- Verify bucket is public if needed

**Rate limiting not working**
- Solution: Check if rate_limits table exists
- Verify triggers are created

## 🎯 Next Steps After Deployment

1. [ ] Set up production environment variables
2. [ ] Configure custom domain
3. [ ] Set up monitoring/alerts
4. [ ] Add Stripe for payments
5. [ ] Configure email service (SendGrid/Resend)
6. [ ] Set up CI/CD pipeline
7. [ ] Add error tracking (Sentry)
8. [ ] Performance monitoring

## 📞 Support

- Supabase Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com
- GitHub Issues: https://github.com/supabase/supabase/issues
