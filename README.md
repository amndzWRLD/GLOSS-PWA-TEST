# GLOSS - Car Detailing Marketplace PWA
Plataforma SaaS + Marketplace + PWA para detailers automotrices independientes y dueños de vehículos de gama media-alta.

GLOSS no es simplemente una marketplace PWA para detailers automotrices.

La esencia del proyecto es convertirse en una plataforma tecnológica moderna orientada a:

- SecDevOps
- Arquitectura SaaS empresarial
- Marketplace systems
- Data-driven UX
- Behavioral economics aplicado a retención y confianza
- Platform engineering
- Escalabilidad modular
- Seguridad empresarial
- Analytics e insights inteligentes
--
## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example` and add your Supabase credentials

3. Run development server:
```bash
npm run dev
```
--

## Filosofía de Ingeniería

### Architecture-First
Dominios modulares sobre monolitos. 
Servicios desacoplados litos para futuras integraciones de IA y evolución de plataforma escalable. 

### Security-First
Estrategia de Deep RLS y JWT integrada desde el Día 1.
Implementación de aislamiento multi-tenant mediante políticas de PostgreSQL (RLS), garantizando que un Detailer jamás acceda a métricas o datos operativos de otro.

### Systems-First
La plataforma sigue la visión de un sistema distribuido:
- analytics
- observability
- event tracking
- authentication
- infrastructure thinking
- scalable domain separation

---

## Developer Profile

Junior Fullstack Developer con interés en:
- Startups
- Cloud-native systems
- SecDevOps
- Enterprise SaaS engineering
- Platform engineering
- Analytics systems
- Behavioral economics applied to digital products

Enfoque actual:
- sistemas escalables
- arquitectura SaaS multi-tenant 
- diseño de base de datos seguras
- observability pipelines
- product-oriented engineering

---

# Tech Stack

## Frontend
- React 18
- Vite
- Tailwind CSS
- React Router

## Backend & Infrastructure
- Supabase
  - Autenticación
  - PostgreSQL Base de Datos
  - Row Level Security (RLS)
  - Storage

## Arquitectura
- Multi-tenant SaaS
- Progressive Web App (PWA)

## Current Database Scope

Supabase services currently manage:

- users
- providers
- authentication
- tenant isolation
- storage buckets

---

# Metodología Desarrollo por Capas
La plataforma está siendo desarrollada progresivamente en capas arquitectónicas.

---

## Layer 1 — Foundation

Core environment y estándares de ingeniería. Configuración del entorno, monorepo, design tokens y contratos compartidos.

Incluye:
- environment setup
- monorepo structure
- design tokens
- shared contracts
- routing foundations
- frontend architecture

---

## Layer 2 — Security & Trust

El núcleo de protección. Auth de Supabase, matriz de permisos y políticas de RLS.

Includes:
- Supabase autenticación
- matriz de permisos
- tenant isolation
- PostgreSQL Row Level Security (RLS)
- secure session handling

---

## Layer 3 — Data & Observability

El sistema nervioso. Analytics, tracking de eventos y monitoreo de performance.

Includes:
- analytics
- event tracking
- monitoring
- performance metrics
- observability pipelines

---

## Layer 4 — Core Marketplace Engine

Operational marketplace systems. Motor operativo. Discovery (Map-first), bookings y lógica de matching.

Includes:
- map-first discovery
- provider matching
- booking systems
- operational workflows
- marketplace logic

---

## Layer 5 — Experience Systems

UX Premium, microinteracciones y economía conductual (retención).

Includes:
- premium interactions
- microinteractions
- behavioral economics
- user engagement systems
- retention-oriented UX


