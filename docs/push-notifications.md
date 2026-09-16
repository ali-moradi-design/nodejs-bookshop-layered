# Web Push notifications

The layered API stores browser Push API subscriptions and can send Web Push messages via the [`web-push`](https://github.com/web-push-libs/web-push) library (VAPID).

## Generate VAPID keys

```bash
npx web-push generate-vapid-keys
```

Copy the **public** key into:

- Backend `.env` → `VAPID_PUBLIC_KEY`
- Frontend `.env` → `VITE_VAPID_PUBLIC_KEY` (or rely on `GET /api/v1/push/vapid-public-key`)

Copy the **private** key **only** into backend `.env` → `VAPID_PRIVATE_KEY`. Never commit the private key.

Also set:

```bash
VAPID_SUBJECT=mailto:admin@bookstore.local
```

## Endpoints (`/api/v1`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/push/vapid-public-key` | public | Returns `{ data: { publicKey } }` |
| `POST` | `/push/subscribe` | cookie/Bearer | Upsert subscription for current user |
| `DELETE` | `/push/subscribe` | cookie/Bearer | Remove subscription by `endpoint` |
| `POST` | `/push/test` | cookie/Bearer | Send a test notification to the current user's subscriptions |
| `POST` | `/admin/push/broadcast` | admin perms | Broadcast to all stored subscriptions |

### Subscribe body

```json
{
  "endpoint": "https://fcm.googleapis.com/fcm/send/…",
  "keys": {
    "p256dh": "…",
    "auth": "…"
  }
}
```

### Unsubscribe body

```json
{ "endpoint": "https://fcm.googleapis.com/fcm/send/…" }
```

## Layers

- Model: `src/models/PushSubscriptionModel.ts`
- Repository: `src/repositories/PushSubscriptionRepository.ts`
- Service: `src/services/push.service.ts`
- Controller: `src/controllers/push.controller.ts`
- Routes: `src/routes/push.routes.ts` (+ admin broadcast on `admin.routes.ts`)

Expired endpoints (`404` / `410` from the push service) are deleted automatically.
