import { authPaths } from '@docs/modules/auth.paths';
import { booksPaths } from '@docs/modules/books.paths';
import { cartPaths } from '@docs/modules/cart.paths';
import { ordersPaths } from '@docs/modules/orders.paths';
import { discountsPaths } from '@docs/modules/discounts.paths';
import { favoritesPaths } from '@docs/modules/favorites.paths';
import { reviewsPaths } from '@docs/modules/reviews.paths';
import { usersPaths } from '@docs/modules/users.paths';
import { rbacPaths } from '@docs/modules/rbac.paths';
import { reportsPaths } from '@docs/modules/reports.paths';
import { adminPaths } from '@docs/modules/admin.paths';
import { uploadsPaths } from '@docs/modules/uploads.paths';
import { otherPaths } from '@docs/modules/other.paths';

export const openApiSpec = {
  openapi: "3.0.3",
  info: {
  "title": "Bookstore API",
  "version": "2.0.0",
  "description": "Layered N-tier bookstore API (Express + Mongoose): JWT auth, RBAC, cart, favorites, discounts, uploads, admin dashboard. Business routes under /api/v1."
},
  servers: [
  {
    "url": "http://localhost:4000",
    "description": "Local"
  }
],
  components: {
  "securitySchemes": {
    "bearerAuth": {
      "type": "http",
      "scheme": "bearer",
      "bearerFormat": "JWT"
    }
  },
  "schemas": {
    "Error": {
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        },
        "errors": {}
      }
    },
    "RegisterRequest": {
      "type": "object",
      "required": [
        "name",
        "email",
        "password"
      ],
      "properties": {
        "name": {
          "type": "string"
        },
        "email": {
          "type": "string",
          "format": "email"
        },
        "password": {
          "type": "string",
          "minLength": 8
        }
      }
    },
    "LoginRequest": {
      "type": "object",
      "required": [
        "email",
        "password"
      ],
      "properties": {
        "email": {
          "type": "string"
        },
        "password": {
          "type": "string"
        }
      }
    },
    "Book": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string"
        },
        "author": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "isbn": {
          "type": "string"
        },
        "price": {
          "type": "number"
        },
        "currency": {
          "type": "string"
        },
        "stock": {
          "type": "integer"
        },
        "coverImageUrl": {
          "type": "string"
        },
        "categories": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "featured": {
          "type": "boolean"
        },
        "featuredOrder": {
          "type": "integer"
        }
      }
    },
    "CreateOrder": {
      "type": "object",
      "required": [
        "items",
        "shippingAddress"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "book": {
                "type": "string"
              },
              "quantity": {
                "type": "integer"
              }
            }
          }
        },
        "shippingAddress": {
          "$ref": "#/components/schemas/ShippingAddress"
        },
        "discountCode": {
          "type": "string"
        }
      }
    },
    "ShippingAddress": {
      "type": "object",
      "required": [
        "fullName",
        "line1",
        "city",
        "postalCode",
        "country"
      ],
      "properties": {
        "fullName": {
          "type": "string"
        },
        "line1": {
          "type": "string"
        },
        "line2": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "postalCode": {
          "type": "string"
        },
        "country": {
          "type": "string"
        }
      }
    },
    "CartItem": {
      "type": "object",
      "properties": {
        "bookId": {
          "type": "string"
        },
        "quantity": {
          "type": "integer"
        }
      }
    },
    "Discount": {
      "type": "object",
      "properties": {
        "code": {
          "type": "string"
        },
        "type": {
          "type": "string",
          "enum": [
            "percent",
            "fixed"
          ]
        },
        "value": {
          "type": "number"
        },
        "minOrderAmount": {
          "type": "number"
        },
        "maxUses": {
          "type": "integer"
        },
        "usedCount": {
          "type": "integer"
        },
        "startsAt": {
          "type": "string",
          "format": "date-time"
        },
        "endsAt": {
          "type": "string",
          "format": "date-time"
        },
        "isActive": {
          "type": "boolean"
        }
      }
    }
  }
},
  paths: {
    ...authPaths,
    ...booksPaths,
    ...cartPaths,
    ...ordersPaths,
    ...discountsPaths,
    ...favoritesPaths,
    ...reviewsPaths,
    ...usersPaths,
    ...rbacPaths,
    ...reportsPaths,
    ...adminPaths,
    ...uploadsPaths,
    ...otherPaths,
  },
} as const;
