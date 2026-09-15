import type { AuthUser } from '@app-types/auth';
import { hasPermission } from '@utils/business/hasPermission';

export function canManageReports(user: AuthUser | undefined): boolean {
  return Boolean(user && hasPermission(user.permissions, 'reports:manage'));
}

export function isAuthenticated(user: AuthUser | undefined): user is AuthUser {
  return Boolean(user?.id);
}
