import { BookService } from '@services/book.service';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { OrderService } from '@services/order.service';
import { ReviewService } from '@services/review.service';
import { PermissionService } from '@services/permission.service';
import { RoleService } from '@services/role.service';
import { ReportService } from '@services/report.service';
import { AuthContextService } from '@services/auth-context.service';
import { DiscountService } from '@services/discount.service';
import { CartService } from '@services/cart.service';
import { FavoriteService } from '@services/favorite.service';
import { DashboardService } from '@services/dashboard.service';
import { PushService } from '@services/push.service';

import {
  bookRepo,
  userRepo,
  orderRepo,
  reviewRepo,
  permissionRepo,
  roleRepo,
  refreshTokenRepo,
  issueRepo,
  cartRepo,
  favoriteRepo,
  discountRepo,
  pushSubscriptionRepo,
} from '@container/repos';
import { tokenService, passwordHasher, unitOfWork, notifier } from '@container/infra';

export const bookService = new BookService(bookRepo);
export const discountService = new DiscountService(discountRepo);
export const authService = new AuthService(
  userRepo,
  roleRepo,
  refreshTokenRepo,
  tokenService,
  passwordHasher,
);
export const userService = new UserService(userRepo, passwordHasher);
export const orderService = new OrderService(
  orderRepo,
  bookRepo,
  discountService,
  unitOfWork,
  notifier,
);
export const reviewService = new ReviewService(reviewRepo, bookRepo);
export const permissionService = new PermissionService(permissionRepo);
export const roleService = new RoleService(roleRepo);
export const reportService = new ReportService(issueRepo, orderRepo);
export const authContextService = new AuthContextService(userRepo, roleRepo, tokenService);
export const cartService = new CartService(cartRepo, bookRepo, orderRepo, discountService);
export const favoriteService = new FavoriteService(favoriteRepo, bookRepo);
export const dashboardService = new DashboardService(userRepo, bookRepo, orderRepo, issueRepo);
export const pushService = new PushService(pushSubscriptionRepo);
