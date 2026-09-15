import { Router } from 'express';
import authRoutes from '@routes/auth.routes';
import permissionsRoutes from '@routes/permissions.routes';
import rolesRoutes from '@routes/roles.routes';
import usersRoutes from '@routes/users.routes';
import booksRoutes from '@routes/books.routes';
import reviewsRoutes from '@routes/reviews.routes';
import ordersRoutes from '@routes/orders.routes';
import reportsRoutes from '@routes/reports.routes';
import cartRoutes from '@routes/cart.routes';
import favoritesRoutes from '@routes/favorites.routes';
import discountsRoutes from '@routes/discounts.routes';
import uploadsRoutes from '@routes/uploads.routes';
import adminRoutes from '@routes/admin.routes';

const v1 = Router();

v1.use('/auth', authRoutes);
v1.use('/permissions', permissionsRoutes);
v1.use('/roles', rolesRoutes);
v1.use('/users', usersRoutes);
v1.use('/books', booksRoutes);
v1.use('/reviews', reviewsRoutes);
v1.use('/orders', ordersRoutes);
v1.use('/reports', reportsRoutes);
v1.use('/cart', cartRoutes);
v1.use('/favorites', favoritesRoutes);
v1.use('/discounts', discountsRoutes);
v1.use('/uploads', uploadsRoutes);
v1.use('/admin', adminRoutes);

export default v1;
