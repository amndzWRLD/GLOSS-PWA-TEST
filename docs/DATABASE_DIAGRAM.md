# GLOSS Database Schema Diagram

## Entity Relationship Diagram

```
┌─────────────────────┐
│    auth.users       │ (Supabase managed)
│─────────────────────│
│ id (UUID) PK        │
│ email               │
│ encrypted_password  │
│ last_sign_in_at     │
└──────────┬──────────┘
           │
           │ 1:1
           ▼
┌─────────────────────┐
│     profiles        │
│─────────────────────│
│ id (UUID) PK/FK     │◄──────────┐
│ email               │           │
│ full_name           │           │
│ phone               │           │
│ role (ENUM)         │           │ 1:1
│ avatar_url          │           │
│ location_lat        │           │
│ location_lng        │           │
│ address             │           │
│ city                │           │
│ created_at          │           │
└──────────┬──────────┘           │
           │                      │
           │ 1:1 (if detailer)    │
           ▼                      │
┌─────────────────────┐           │
│ detailer_profiles   │           │
│─────────────────────│           │
│ id (UUID) PK        │           │
│ user_id (UUID) FK   │───────────┘
│ business_name       │
│ bio                 │
│ experience_years    │
│ verified            │
│ rating              │
│ total_reviews       │
│ total_services      │
│ badge               │
│ service_radius_km   │
│ available           │
│ created_at          │
└──────────┬──────────┘
           │
           │ 1:N
           ▼
┌─────────────────────┐         ┌─────────────────────┐
│     services        │         │ service_categories  │
│─────────────────────│         │─────────────────────│
│ id (UUID) PK        │    ┌───►│ id (UUID) PK        │
│ detailer_id FK      │    │    │ name                │
│ category_id FK      │────┘    │ slug                │
│ name                │         │ description         │
│ description         │         │ icon_url            │
│ price_min           │         │ display_order       │
│ price_max           │         │ active              │
│ duration_min        │         └─────────────────────┘
│ duration_max        │
│ active              │
│ created_at          │
└──────────┬──────────┘
           │
           │ 1:N
           ▼
┌─────────────────────┐
│     bookings        │
│─────────────────────│
│ id (UUID) PK        │
│ customer_id FK      │───────┐
│ detailer_id FK      │       │
│ service_id FK       │       │
│ status (ENUM)       │       │
│ scheduled_date      │       │
│ scheduled_time      │       │
│ location_address    │       │
│ location_lat        │       │
│ location_lng        │       │
│ notes               │       │
│ price_agreed        │       │
│ created_at          │       │
│ completed_at        │       │
│ cancelled_at        │       │
└──────────┬──────────┘       │
           │                  │
           │ 1:1              │
           ▼                  │
┌─────────────────────┐       │
│      reviews        │       │
│─────────────────────│       │
│ id (UUID) PK        │       │
│ booking_id FK       │       │
│ customer_id FK      │───────┤
│ detailer_id FK      │       │
│ rating (1-5)        │       │
│ comment             │       │
│ response            │       │
│ created_at          │       │
└─────────────────────┘       │
                              │
           ┌──────────────────┘
           │
           │ 1:N
           ▼
┌─────────────────────┐
│     payments        │
│─────────────────────│
│ id (UUID) PK        │
│ booking_id FK       │
│ customer_id FK      │
│ detailer_id FK      │
│ amount              │
│ currency            │
│ status (ENUM)       │
│ payment_method      │
│ transaction_id      │
│ metadata (JSONB)    │
│ created_at          │
└─────────────────────┘


┌─────────────────────┐
│    audit_logs       │ (Immutable)
│─────────────────────│
│ id (UUID) PK        │
│ user_id FK          │
│ action              │
│ resource_type       │
│ resource_id         │
│ old_data (JSONB)    │
│ new_data (JSONB)    │
│ ip_address          │
│ user_agent          │
│ created_at          │
└─────────────────────┘

┌─────────────────────┐
│    rate_limits      │
│─────────────────────│
│ id (UUID) PK        │
│ user_id FK          │
│ ip_address          │
│ endpoint            │
│ request_count       │
│ window_start        │
│ created_at          │
└─────────────────────┘
```

## Data Flow Examples

### 1. Customer Books Service
```
Customer (profiles) 
    → Searches detailers (detailer_profiles)
    → Views services (services)
    → Creates booking (bookings)
    → [Audit log created]
```

### 2. Detailer Completes Service
```
Detailer (detailer_profiles)
    → Views booking (bookings)
    → Updates status to 'completed'
    → [Audit log created]
    → Customer can now create review (reviews)
    → Payment processed (payments)
```

### 3. Review & Rating Update
```
Customer creates review (reviews)
    → Trigger updates detailer_profiles.rating
    → Trigger updates detailer_profiles.total_reviews
    → [Audit log created]
```

## Security Layers

### Layer 1: Row Level Security (RLS)
- Every table has RLS policies
- Users can only access their own data
- Detailers see their bookings/services
- Admins have elevated access

### Layer 2: Role-Based Access Control (RBAC)
- Roles: customer, detailer, admin
- Embedded in JWT claims
- Checked at database level

### Layer 3: Audit Logging
- All mutations logged automatically
- Immutable records
- Includes old/new data for updates

### Layer 4: Rate Limiting
- Per-user and per-IP limits
- Different limits per endpoint
- Prevents abuse and DDoS

## Key Relationships

1. **User → Profile** (1:1): Every auth user has one profile
2. **Profile → Detailer Profile** (1:1): Only if role = 'detailer'
3. **Detailer → Services** (1:N): One detailer offers many services
4. **Service → Category** (N:1): Services belong to categories
5. **Booking → Customer/Detailer** (N:1): Many bookings per user
6. **Booking → Review** (1:1): One review per completed booking
7. **Booking → Payment** (1:N): Multiple payment attempts possible

## Indexes for Performance

### High-Traffic Queries
- `profiles.role` - Filter by user type
- `profiles.location_lat, location_lng` - Geospatial search
- `detailer_profiles.rating` - Sort by rating
- `bookings.customer_id, detailer_id` - User's bookings
- `bookings.scheduled_date` - Calendar queries
- `services.detailer_id` - Detailer's services

### Security Queries
- `audit_logs.user_id` - User activity
- `audit_logs.created_at` - Recent events
- `rate_limits.user_id, endpoint` - Rate limit checks
