import {
  BookRepository,
  UserRepository,
  OrderRepository,
  ReviewRepository,
  PermissionRepository,
  RoleRepository,
  RefreshTokenRepository,
  IssueReportRepository,
  CartRepository,
  FavoriteRepository,
  DiscountRepository,
  PushSubscriptionRepository,
} from '@repositories/index';

export const bookRepo = new BookRepository();
export const userRepo = new UserRepository();
export const orderRepo = new OrderRepository();
export const reviewRepo = new ReviewRepository();
export const permissionRepo = new PermissionRepository();
export const roleRepo = new RoleRepository();
export const refreshTokenRepo = new RefreshTokenRepository();
export const issueRepo = new IssueReportRepository();
export const cartRepo = new CartRepository();
export const favoriteRepo = new FavoriteRepository();
export const discountRepo = new DiscountRepository();
export const pushSubscriptionRepo = new PushSubscriptionRepository();

export const repos = {
  books: bookRepo,
  users: userRepo,
  orders: orderRepo,
  reviews: reviewRepo,
  permissions: permissionRepo,
  roles: roleRepo,
  refreshTokens: refreshTokenRepo,
  issues: issueRepo,
  carts: cartRepo,
  favorites: favoriteRepo,
  discounts: discountRepo,
  pushSubscriptions: pushSubscriptionRepo,
};
