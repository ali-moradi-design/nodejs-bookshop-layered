import { Router } from 'express';
import { authenticate, requireAnyPermission } from '@middleware/security/auth';
import { validate } from '@middleware/validate';
import * as ctrl from '@controllers/admin.controller';
import * as pushCtrl from '@controllers/push.controller';
import {
  recentOrdersQuerySchema,
  lowStockQuerySchema,
} from '@validators/admin.validation';
import { broadcastPushSchema } from '@validators/push.validation';

const router = Router();
router.use(authenticate);
router.use(requireAnyPermission('admin:dashboard', 'reports:analytics'));

router.get('/dashboard/summary', ctrl.summary);
router.get(
  '/dashboard/recent-orders',
  validate({ query: recentOrdersQuerySchema }),
  ctrl.recentOrders,
);
router.get(
  '/dashboard/low-stock',
  validate({ query: lowStockQuerySchema }),
  ctrl.lowStock,
);

router.post(
  '/push/broadcast',
  validate({ body: broadcastPushSchema }),
  pushCtrl.broadcast,
);

export default router;
