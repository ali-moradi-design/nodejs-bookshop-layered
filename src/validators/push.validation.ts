import { z } from 'zod';

export const subscribePushSchema = z.object({
  endpoint: z.string().url(),
  keys: z.object({
    p256dh: z.string().min(1),
    auth: z.string().min(1),
  }),
});

export const unsubscribePushSchema = z.object({
  endpoint: z.string().url(),
});

export const testPushSchema = z.object({
  title: z.string().min(1).max(120).optional(),
  body: z.string().min(1).max(500).optional(),
  url: z.string().min(1).max(500).optional(),
});

export const broadcastPushSchema = z.object({
  title: z.string().min(1).max(120),
  body: z.string().min(1).max(500),
  url: z.string().min(1).max(500).optional(),
  tag: z.string().min(1).max(80).optional(),
  data: z.record(z.string(), z.unknown()).optional(),
});
