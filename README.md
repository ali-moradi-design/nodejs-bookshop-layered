# Bookstore API (Layered / N-tier)

Node.js + TypeScript + Express + **Mongoose** bookstore backend with JWT auth, RBAC, books, reviews, orders (fake payments + stock), cart, favorites, discount codes, local image uploads, admin dashboard, and reports.

> **API prefix:** business routes under **`/api/v1/...`**. Health: `/api/health`. Swagger: `/api/docs`.

## Architecture (classic layers)

```
src/
  config/           # env + Mongo connection
  models/           # Mongoose schemas only
  repositories/     # thin data access (+ mappers, UoW)
  services/         # business logic by feature
  controllers/      # HTTP adapters + presenters (DTO edge)
  routes/           # /api/v1 routers
  middleware/       # errors, auth, rate-limit, upload, validate
  validators/       # Zod schemas
  utils/            # AppError, pagination, tokens, business helpers
  types/            # shared TypeScript types
  docs/             # OpenAPI modules
  container/        # composition root (wire repos → services)
  scripts/seed.ts
  app.ts
  server.ts
```

Flow: **controllers → services → repositories → models**. Details: [docs/architecture.md](docs/architecture.md) · [docs/modules.md](docs/modules.md).

## Stack

- Express 5, Mongoose, Zod, Helmet, express-rate-limit, multer, cookie-parser
- bcryptjs, jsonwebtoken, dotenv, cors, morgan
- swagger-ui-express (`/api/docs`)
- ESLint + Prettier, tsx, tsc-alias
- Vitest + supertest + mongodb-memory-server (**Mongo binary pinned to 7.0.14**)

## Setup

```bash
cp .env.example .env
npm install
# start MongoDB locally (mongodb://127.0.0.1:27017/bookstore)
npm run seed
npm run dev
```

Default admin (seed):

- Email: `admin@bookstore.local`
- Password: `Admin123!`

Sample discounts: `WELCOME10` (10% off, min $20), `FLAT5` ($5 off, min $15).

## Docker

```bash
docker build -t nodejs-bookshop-layered .
docker run --rm -p 4000:4000 --env-file .env nodejs-bookshop-layered
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | tsx watch |
| `npm run build` | `tsc` + `tsc-alias` |
| `npm start` | run compiled server |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run seed` | permissions, roles, admin, books, discounts |
| `npm test` | unit + integration (Vitest) |

## Path aliases

`@config`, `@models`, `@repositories`, `@services`, `@controllers`, `@routes`, `@middleware`, `@validators`, `@utils`, `@app-types`, `@docs`, `@container`

## Key routes

### Unversioned

- `GET /api/health`
- `GET /api/docs` · `GET /api/docs.json`

### `/api/v1`

- **Auth:** register, login, refresh, logout (JSON tokens + httpOnly cookies; Bearer or cookie)

### Cookie auth (Next.js / browsers)

Register / login / refresh return tokens in JSON **and** set httpOnly cookies (`accessToken`, `refreshToken`). Protected routes accept `Authorization: Bearer <token>` first, otherwise the `accessToken` cookie. Refresh/logout accept body **or** `refreshToken` cookie.

CORS is `credentials: true`. Set `CORS_ORIGIN` to the frontend origin (e.g. `http://localhost:3000`). Do **not** use `*` in production with credentials.

```ts
const API = 'http://localhost:4000';

await fetch(`${API}/api/v1/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ email, password }),
});

const me = await fetch(`${API}/api/v1/users/me`, { credentials: 'include' });

await fetch(`${API}/api/v1/auth/refresh`, {
  method: 'POST',
  credentials: 'include',
});

await fetch(`${API}/api/v1/auth/logout`, {
  method: 'POST',
  credentials: 'include',
});
```

Cookie flags: `httpOnly`, `path=/`, `secure` from `COOKIE_SECURE` (default true in production), `sameSite` from `COOKIE_SAME_SITE` (default `lax`). Optional `COOKIE_DOMAIN`.

- **Books:** CRUD, list/search, featured
- **Cart / Orders / Favorites / Discounts / Reviews**
- **RBAC:** roles, permissions
- **Users**, **Reports**, **Admin dashboard**, **Uploads**

## License

MIT
