# Backend API

## Setup

1. Create `Backend/.env` with:
```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
PORT=3001
```
2. Install deps and run:
```
npm install
npm run dev
```

## Endpoints
- GET `/health`
- GET `/usuarios`
- GET `/usuarios/:id`
- POST `/usuarios`
- PUT `/usuarios/:id`
- DELETE `/usuarios/:id`  (soft delete via `deleted_at`)

> Requires `service_role` key configured in `.env`.
