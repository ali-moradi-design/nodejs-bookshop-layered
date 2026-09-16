import { Request, Response } from 'express';
import { pushService } from '@container/services';
import { asyncHandler } from '@utils/asyncHandler';

export const getVapidPublicKey = asyncHandler(async (_req: Request, res: Response) => {
  const publicKey = pushService.getPublicKey();
  res.json({ data: { publicKey } });
});

export const subscribe = asyncHandler(async (req: Request, res: Response) => {
  const record = await pushService.subscribe({
    userId: req.user!.id,
    endpoint: req.body.endpoint,
    keys: req.body.keys,
    userAgent: req.get('user-agent') ?? undefined,
  });
  res.status(201).json({ data: { id: record.id, endpoint: record.endpoint } });
});

export const unsubscribe = asyncHandler(async (req: Request, res: Response) => {
  await pushService.unsubscribe(req.user!.id, req.body.endpoint);
  res.json({ message: 'Push subscription removed' });
});

export const sendTest = asyncHandler(async (req: Request, res: Response) => {
  const title = (req.body.title as string | undefined) || 'Niko Bookshop';
  const body =
    (req.body.body as string | undefined) || 'This is a test push notification.';
  const url = (req.body.url as string | undefined) || '/';
  const result = await pushService.sendToUser(req.user!.id, {
    title,
    body,
    url,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    tag: 'test-push',
  });
  res.json({ data: result });
});

export const broadcast = asyncHandler(async (req: Request, res: Response) => {
  const result = await pushService.broadcast({
    title: req.body.title,
    body: req.body.body,
    url: req.body.url || '/',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    tag: req.body.tag || 'broadcast',
    data: req.body.data,
  });
  res.json({ data: result });
});
