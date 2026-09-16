import { Router } from 'express';
import { authenticate } from '@middleware/security/auth';
import { validate } from '@middleware/validate';
import * as ctrl from '@controllers/push.controller';
import {
  subscribePushSchema,
  testPushSchema,
  unsubscribePushSchema,
} from '@validators/push.validation';

const router = Router();

/** Public — clients need the VAPID key before requesting notification permission. */
router.get('/vapid-public-key', ctrl.getVapidPublicKey);

router.post('/subscribe', authenticate, validate({ body: subscribePushSchema }), ctrl.subscribe);
router.delete(
  '/subscribe',
  authenticate,
  validate({ body: unsubscribePushSchema }),
  ctrl.unsubscribe,
);
router.post('/test', authenticate, validate({ body: testPushSchema }), ctrl.sendTest);

export default router;
