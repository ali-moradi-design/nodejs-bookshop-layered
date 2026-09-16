import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  authHeader,
  registerCustomer,
  setupTestApp,
  teardownTestApp,
  type TestContext,
} from '../helpers/testApp';

describe('Web Push API', () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await setupTestApp();
  }, 120_000);

  afterAll(async () => {
    await teardownTestApp();
  }, 60_000);

  const demoEndpoint = `https://push.example.test/endpoint/${Date.now()}`;

  it('GET /push/vapid-public-key is public', async () => {
    const res = await ctx.request.get('/api/v1/push/vapid-public-key').expect(200);
    expect(res.body.data.publicKey).toBeTruthy();
    expect(typeof res.body.data.publicKey).toBe('string');
  });

  it('subscribe → unsubscribe for authenticated user', async () => {
    const customer = await registerCustomer(ctx.request);
    const token = customer.accessToken as string;

    const subscribed = await ctx.request
      .post('/api/v1/push/subscribe')
      .set(authHeader(token))
      .send({
        endpoint: demoEndpoint,
        keys: { p256dh: 'demo-p256dh-key', auth: 'demo-auth-key' },
      })
      .expect(201);

    expect(subscribed.body.data.endpoint).toBe(demoEndpoint);

    // upsert same endpoint
    await ctx.request
      .post('/api/v1/push/subscribe')
      .set(authHeader(token))
      .send({
        endpoint: demoEndpoint,
        keys: { p256dh: 'demo-p256dh-key-2', auth: 'demo-auth-key-2' },
      })
      .expect(201);

    await ctx.request
      .delete('/api/v1/push/subscribe')
      .set(authHeader(token))
      .send({ endpoint: demoEndpoint })
      .expect(200);

    await ctx.request
      .delete('/api/v1/push/subscribe')
      .set(authHeader(token))
      .send({ endpoint: demoEndpoint })
      .expect(404);
  });

  it('rejects subscribe without auth', async () => {
    await ctx.request
      .post('/api/v1/push/subscribe')
      .send({
        endpoint: 'https://push.example.test/no-auth',
        keys: { p256dh: 'x', auth: 'y' },
      })
      .expect(401);
  });

  it('POST /push/test returns send stats (may fail delivery to fake endpoint)', async () => {
    const customer = await registerCustomer(ctx.request);
    const token = customer.accessToken as string;
    const endpoint = `https://push.example.test/test/${Date.now()}`;

    await ctx.request
      .post('/api/v1/push/subscribe')
      .set(authHeader(token))
      .send({
        endpoint,
        keys: { p256dh: 'dGVzdC1wMjU2ZGgtand0', auth: 'dGVzdC1hdXRoLWp3dA' },
      })
      .expect(201);

    const res = await ctx.request
      .post('/api/v1/push/test')
      .set(authHeader(token))
      .send({ title: 'Test', body: 'Hello' })
      .expect(200);

    expect(res.body.data).toHaveProperty('sent');
    expect(res.body.data).toHaveProperty('failed');
    expect(res.body.data.sent + res.body.data.failed).toBeGreaterThanOrEqual(1);
  });
});
