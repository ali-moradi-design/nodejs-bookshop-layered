import webpush from 'web-push';
import type { IPushSubscriptionRepository } from '@repositories/interfaces/push-subscription.repository';
import type {
  PushPayload,
  PushSubscriptionRecord,
  UpsertPushSubscriptionInput,
} from '@app-types/push';
import { env } from '@config/env';
import { AppError } from '@utils/AppError';
import { logger } from '@utils/logger';

export class PushService {
  private configured = false;

  constructor(private readonly subscriptions: IPushSubscriptionRepository) {
    this.configureVapid();
  }

  private configureVapid(): void {
    if (!env.VAPID_PUBLIC_KEY || !env.VAPID_PRIVATE_KEY) {
      this.configured = false;
      return;
    }
    webpush.setVapidDetails(env.VAPID_SUBJECT, env.VAPID_PUBLIC_KEY, env.VAPID_PRIVATE_KEY);
    this.configured = true;
  }

  getPublicKey(): string {
    if (!env.VAPID_PUBLIC_KEY) {
      throw new AppError('VAPID public key is not configured', 503);
    }
    return env.VAPID_PUBLIC_KEY;
  }

  async subscribe(input: UpsertPushSubscriptionInput): Promise<PushSubscriptionRecord> {
    return this.subscriptions.upsert(input);
  }

  async unsubscribe(userId: string, endpoint: string): Promise<void> {
    const ok = await this.subscriptions.deleteByUserAndEndpoint(userId, endpoint);
    if (!ok) throw new AppError('Push subscription not found', 404);
  }

  async listUserSubscriptions(userId: string): Promise<PushSubscriptionRecord[]> {
    return this.subscriptions.listByUser(userId);
  }

  async sendToUser(userId: string, payload: PushPayload): Promise<{ sent: number; failed: number }> {
    this.assertConfigured();
    const subs = await this.subscriptions.listByUser(userId);
    return this.sendToMany(subs, payload);
  }

  async broadcast(payload: PushPayload): Promise<{ sent: number; failed: number }> {
    this.assertConfigured();
    const subs = await this.subscriptions.listAll();
    return this.sendToMany(subs, payload);
  }

  private assertConfigured(): void {
    if (!this.configured) {
      throw new AppError(
        'Web Push is not configured. Set VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, and VAPID_SUBJECT.',
        503,
      );
    }
  }

  private async sendToMany(
    subs: PushSubscriptionRecord[],
    payload: PushPayload,
  ): Promise<{ sent: number; failed: number }> {
    let sent = 0;
    let failed = 0;
    const body = JSON.stringify(payload);

    await Promise.all(
      subs.map(async (sub) => {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: sub.keys,
            },
            body,
          );
          sent += 1;
        } catch (err) {
          failed += 1;
          const statusCode =
            err && typeof err === 'object' && 'statusCode' in err
              ? Number((err as { statusCode?: number }).statusCode)
              : undefined;
          logger.warn('web-push send failed', {
            endpoint: sub.endpoint.slice(0, 48),
            statusCode,
            message: err instanceof Error ? err.message : String(err),
          });
          // Gone / expired subscription — clean up
          if (statusCode === 404 || statusCode === 410) {
            await this.subscriptions.deleteByEndpoint(sub.endpoint);
          }
        }
      }),
    );

    return { sent, failed };
  }
}
