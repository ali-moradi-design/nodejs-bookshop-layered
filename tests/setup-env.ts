/**
 * Must run before any app module imports env.ts.
 * Mongo URI is overwritten by the test helper after memory server starts;
 * a placeholder satisfies Zod at first import.
 */
process.env.NODE_ENV = 'test';
process.env.PORT = '4000';
process.env.MONGODB_URI =
  process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/bookstore-test-placeholder';
process.env.JWT_ACCESS_SECRET = 'test-access-secret-key-min8';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-key-min8';
process.env.ACCESS_TOKEN_TTL = '15m';
process.env.REFRESH_TOKEN_TTL = '7d';
process.env.CORS_ORIGIN = '*';
process.env.UPLOAD_DIR = 'uploads';
process.env.COOKIE_SECURE = 'false';
process.env.COOKIE_SAME_SITE = 'lax';
process.env.VAPID_PUBLIC_KEY =
  process.env.VAPID_PUBLIC_KEY ??
  'BPdSx-eYB4iIV3gPg9DaitY1h2xa9arRm908oAHLg8t0yNt0BeiF4Fc8IfwLSUvsipB-zV3LRuTRV3z1XFsU-Fc';
process.env.VAPID_PRIVATE_KEY =
  process.env.VAPID_PRIVATE_KEY ?? 'kQLygDrTVg9j7iPpXj5PnfVlUUV04ra08AWrj4cblZY';
process.env.VAPID_SUBJECT = process.env.VAPID_SUBJECT ?? 'mailto:test@bookstore.local';
