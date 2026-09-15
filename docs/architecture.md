# Architecture — Classic Layered / N-tier

This bookstore API uses a **classic layered (N-tier)** layout on MongoDB/Mongoose.

## Layers

| Layer | Path | Responsibility |
|-------|------|----------------|
| **HTTP** | `controllers/`, `routes/`, `middleware/`, `validators/`, `docs/` | Express routing, validation, auth/RBAC guards, DTO presentation, OpenAPI |
| **Services** | `services/` | Business logic by feature (auth, books, cart, orders, …) |
| **Data access** | `repositories/` | Thin Mongoose queries + document→plain-object mappers |
| **Models** | `models/` | Mongoose schemas only |
| **Config** | `config/` | Env (Zod) + DB connection |
| **Shared** | `utils/`, `types/` | Errors, pagination, money/ISBN helpers, business rules, logging, tokens |
| **Wiring** | `container/` | Composition root: repo + service singletons |

**Request flow**

```
HTTP routes → middleware (auth, validate)
  → controllers (DTO map / response envelope)
  → services (business rules)
  → repositories
  → models (Mongoose)
```

Controllers must not import `models/` (ESLint). Services depend on repository interfaces; the container wires concrete repositories.

## Path aliases

`@config`, `@models`, `@repositories`, `@services`, `@controllers`, `@routes`, `@middleware`, `@validators`, `@utils`, `@app-types`, `@docs`, `@container`

## Errors

- `DomainError` / business rule failures in `utils/` (stock, discounts, transitions)
- Mapped to HTTP `AppError` in `middleware/errorHandler.ts`
- Zod validation → 400 with flattened errors

## Seed & scripts

`src/scripts/seed.ts` — permissions/roles/admin/books/discounts. Permission catalog lives in `utils/seed/permissions.ts`.
