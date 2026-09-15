/** RBAC permission catalog used by seed (and documentation). */

export const SECTIONS = [
  'books',
  'users',
  'roles',
  'permissions',
  'orders',
  'reviews',
  'reports',
  'discounts',
] as const;

export const CRUD = ['create', 'read', 'update', 'delete'] as const;

export function basePermissions() {
  const perms: { slug: string; name: string; description: string; section: string }[] = [];

  for (const section of SECTIONS) {
    for (const action of CRUD) {
      perms.push({
        slug: `${section}:${action}`,
        name: `${section} ${action}`,
        description: `Can ${action} ${section}`,
        section,
      });
    }
  }

  const extras = [
    { slug: 'orders:read-own', name: 'orders read own', description: 'Read own orders', section: 'orders' },
    { slug: 'orders:update-status', name: 'orders update status', description: 'Update order status', section: 'orders' },
    { slug: 'reviews:update-own', name: 'reviews update own', description: 'Update own reviews', section: 'reviews' },
    { slug: 'reviews:delete-own', name: 'reviews delete own', description: 'Delete own reviews', section: 'reviews' },
    { slug: 'users:read-own', name: 'users read own', description: 'Read own profile', section: 'users' },
    { slug: 'users:update-own', name: 'users update own', description: 'Update own profile', section: 'users' },
    { slug: 'reports:analytics', name: 'reports analytics', description: 'View analytics', section: 'reports' },
    { slug: 'reports:manage', name: 'reports manage', description: 'Manage issue reports', section: 'reports' },
    { slug: 'reports:issues:create', name: 'reports issues create', description: 'Create issue reports', section: 'reports' },
    { slug: 'admin:dashboard', name: 'admin dashboard', description: 'Access admin dashboard endpoints', section: 'admin' },
  ];

  return [...perms, ...extras];
}

export const CUSTOMER_SLUGS = [
  'books:read',
  'orders:create',
  'orders:read-own',
  'reviews:create',
  'reviews:read',
  'reviews:update-own',
  'reviews:delete-own',
  'reports:issues:create',
  'users:read-own',
  'users:update-own',
];

export function coverUrl(isbn: string): string {
  const clean = isbn.replace(/-/g, '');
  return `https://covers.openlibrary.org/b/isbn/${clean}-L.jpg`;
}
