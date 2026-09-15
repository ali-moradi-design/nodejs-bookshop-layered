# Modules (feature map)

Classic N-tier: each feature typically has **route → controller → service → repository → model**.

| Feature | Service | Repository | Model | HTTP (`/api/v1/...`) |
|---------|---------|------------|-------|----------------------|
| Auth | `auth.service`, `auth-context.service` | `User`, `Role`, `RefreshToken` | User, Role, RefreshToken | `/auth` |
| Users | `user.service` | `UserRepository` | User | `/users` |
| RBAC | `role.service`, `permission.service` | Role, Permission | Role, Permission | `/roles`, `/permissions` |
| Books | `book.service` | `BookRepository` | Book | `/books`, `/books/featured` |
| Cart | `cart.service` (+ cart helpers) | `CartRepository` | Cart | `/cart` |
| Orders | `order.service` (+ pay flow) | `OrderRepository` | Order | `/orders` |
| Discounts | `discount.service` | `DiscountRepository` | Discount | `/discounts` |
| Favorites | `favorite.service` | `FavoriteRepository` | Favorite | `/favorites` |
| Reviews | `review.service` | `ReviewRepository` | Review | `/reviews` |
| Reports | `report.service` | `IssueReportRepository` | IssueReport | `/reports` |
| Admin | `dashboard.service` | (aggregates) | — | `/admin` |
| Uploads | (storage util) | — | — | `/uploads` |

Shared business helpers: `utils/business/` (stock, cart totals, discount calc, order transitions, RBAC checks).
