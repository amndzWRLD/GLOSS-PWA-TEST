# 🚗 GLOSS - Marketplace PWA de Detallado de Autos

## ⚙️ Configuración del Proyecto

### 1. Instalar dependencias
```bash
npm install
```

### 2. Variables de entorno
Crea el archivo `.env` a partir de `.env.example` y agregar las credenciales de Supabase.

### 3. Ejecutar entorno de desarrollo
```bash
npm run dev
```


# 🌐 GLOSS

GLOSS es una Progressive Web App (PWA) moderna, enfocada en seguridad y construida sobre una arquitectura nativa de Supabase.  
Está diseñada como una base Software-as-a-Service escalable con autenticación, rutas protegidas y módulos extensibles.

---

## 🚀 Estado Actual

GLOSS se encuentra en desarrollo activo.
Ha evolucionado desde un prototipo híbrido hacia una arquitectura centrada en Supabase.

### ✔ Progreso actual
- Autenticación con Supabase integrada
- Migraciones de base de datos inicializadas (001)
- Row Level Security (RLS) habilitado
- Repositorio limpio (sin node_modules)
- Estructura en proceso de normalización para SaaS

---

## ⚙️ Stack Tecnológico
- React 18
- Vite
- Tailwind CSS
- React Router
- Supabase (auth, database, storage)

### Frontend
- React (Vite)
- React Router DOM
- Context API (Auth layer)
- Tailwind CSS

### Backend / BaaS
- Supabase
  - Autenticación (JWT)
  - PostgreSQL
  -  Row Level Security (RLS)
  -  Realtime

### 🔐 Modelo de Seguridad
  -  Autenticación basada en JWT (Supabase Auth)
  -  Autorización mediante políticas RLS
  -  Acceso a datos por usuario (auth.uid())
  -  Arquitectura stateless (sin sesiones persistentes en servidor)

---

## 🧱 Arquitectura del Proyecto

GLOSS-PWA-TEST/
│
├── src/ # React frontend
│   ├── pages/          # Vistas principales
│   ├── components/     # Componentes reutilizables
│   ├── context/        # AuthContext global
│   ├── utils/          # Funciones auxiliares
│
├── public/             # Assets de PWA
│
├── supabase/
│   ├── migrations/     # Versionado de DB
│   └── seed.sql
│
├── docs/               # Documentación técnica
│   ├── completed_tasks.md
│   ├── auth_migration.md
│   ├── development_log.md
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── .env

## 📌 Reglas de Desarrollo

- No incluir datos sensibles en Git (.env excluido)
- No versionar node_modules
- Usar supabase/migrations para cambios en base de datos
- Documentar decisiones arquitectónicas en /docs

---

## 🧠 ROADMAP

Evolución planificada de GLOSS:

-  Arquitectura SaaS multi-módulo
-  Refactor de AuthContext (capa limpia React + Supabase)
-  Sistema de rutas protegidas
-  Implementación completa de RLS
-  Sistema de perfiles de usuario
-  Dashboard base (analítica + panel)
-  Módulo SENTRY (detección de anomalías y manipulación de datos)

---

## 🎯 Visión

GLOSS apunta a evolucionar hacia una plataforma SaaS completa capaz de integrar:

-  Sistemas de analítica avanzada
-  Tracking de comportamiento de usuario
-  Sistemas de integridad de datos
-  Dashboards centrados en experiencia premium

---

## 📍 Estado del proyecto

> Arquitectura SaaS en etapa temprana de desarrollo activo.
