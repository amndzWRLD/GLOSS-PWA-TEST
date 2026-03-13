# GLOSS Supabase Database Schema

## Security Architecture

### 1. Row Level Security (RLS)
All tables have RLS enabled with granular policies:
- **Profiles**: Users can view all, but only modify their own
- **Detailer Profiles**: Public read, owner write
- **Services**: Public read for active services, owner write
- **Bookings**: Customers and detailers can only see their own
- **Reviews**: Public read, customers can write for completed bookings
- **Payments**: Restricted to involved parties and admins
- **Audit Logs**: Users see their own, admins see all (immutable)

### 2. Role-Based Access Control (RBAC)
Three roles: `customer`, `detailer`, `admin`

**Permissions Matrix:**
```
Resource          | Customer | Detailer | Admin
------------------|----------|----------|-------
View Services     | ✓        | ✓        | ✓
Create Booking    | ✓        | ✗        | ✓
Manage Services   | ✗        | Own      | All
View Bookings     | Own      | Own      | All
Create Review     | Own      | ✗        | ✓
View Payments     | Own      | Own      | All
View Audit Logs   | Own      | Own      | All
```

### 3. JWT Custom Claims
- User role embedded in JWT token
- Auto-updated when role changes
- Used for client-side authorization

### 4. Audit Logging
All critical operations logged:
- User authentication (login, signup, logout)
- Data mutations (create, update, delete)
- Includes: user_id, action, resource, old/new data, IP, timestamp

### 5. Rate Limiting
Database-level rate limiting:
- Login: 5 attempts per 15 minutes
- Signup: 3 attempts per hour
- Bookings: 10 per hour
- API calls: 100 per minute
- Search: 50 per minute

## Database Schema

### Core Tables
1. **profiles** - User accounts (extends auth.users)
2. **detailer_profiles** - Service provider details
3. **service_categories** - Service types
4. **services** - Services offered by detailers
5. **bookings** - Appointment bookings (CITA in DER)
6. **reviews** - Customer reviews (REVIEW in DER)
7. **payments** - Payment transactions
8. **media** - Photos/videos for services, reviews, bookings (MEDIA in DER)
9. **audit_logs** - Immutable audit trail
10. **rate_limits** - Rate limiting tracking

### Relationships (matching your DER)
- **RECIBE** - User receives reviews (1:M)
- **GENERA** - User generates reviews (1:M)
- **TIENE** - Provider has profile (1:1)
- **ATIENDE** - Provider attends bookings (1:M)
- **ASIGNA** - User assigns bookings (1:M)
- **INCLUYE** - Booking includes service (M:1)
- **OFRECE** - Provider offers services (1:M)
- **CLASIFICA** - Service classified by category (M:1)
- **POSEE** - Service has media (1:M)
- **ADJUNTA** - Review/Booking has media (1:M)
- **PUBLICA** - User publishes media (1:M)

## Migration Order
Run migrations in order:
1. `001_initial_schema.sql` - Base tables and indexes (includes MEDIA table)
2. `002_row_level_security.sql` - RLS policies (includes MEDIA policies)
3. `003_audit_triggers.sql` - Audit logging (includes MEDIA auditing)
4. `004_jwt_custom_claims.sql` - JWT role management
5. `005_rate_limiting.sql` - Rate limit functions
6. `006_seed_data.sql` - Initial data
7. `007_storage_buckets.sql` - Supabase Storage buckets for files
8. `008_helper_functions.sql` - Business logic functions

## Setup Instructions

### 1. Create Supabase Project
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref your-project-ref
```

### 2. Run Migrations
```bash
# Run all migrations
supabase db push

# Or run individually
psql -h your-db-host -U postgres -d postgres -f supabase/migrations/001_initial_schema.sql
```

### 3. Configure Auth
In Supabase Dashboard → Authentication → Settings:
- Enable Email auth
- Set JWT expiry: 15 minutes (access token)
- Enable refresh tokens: 7 days
- Add custom claims hook (optional)

### 4. Environment Variables
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Security Best Practices

### Frontend
- Store JWT in httpOnly cookies (not localStorage)
- Implement token refresh before expiry
- Add CSRF protection
- Validate all inputs

### Backend
- Use prepared statements (Supabase does this)
- Validate all RLS policies
- Monitor audit logs regularly
- Set up alerts for suspicious activity

### API Gateway (Future)
- Add Kong/Nginx in front of Supabase
- Implement additional rate limiting
- Add request validation
- Set up WAF rules

## Monitoring

### Key Metrics to Track
1. Failed login attempts (potential brute force)
2. Rate limit violations
3. Unusual data access patterns
4. Payment failures
5. Booking cancellation rates

### Audit Log Queries
```sql
-- Recent failed logins
SELECT * FROM audit_logs
WHERE action = 'login' AND new_data->>'success' = 'false'
ORDER BY created_at DESC LIMIT 100;

-- User activity summary
SELECT user_id, action, COUNT(*)
FROM audit_logs
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY user_id, action;

-- Suspicious payment activity
SELECT * FROM audit_logs
WHERE resource_type = 'payments'
  AND action = 'update'
  AND old_data->>'status' != new_data->>'status'
ORDER BY created_at DESC;
```

## Compliance

### Data Protection
- All PII encrypted at rest (Supabase default)
- Audit logs retained for 90 days
- User data deletion on request (GDPR)
- Payment data PCI-DSS compliant (use Stripe)

### Access Control
- Principle of least privilege
- Regular permission audits
- Admin actions logged
- Multi-factor auth for admins (enable in Supabase)
