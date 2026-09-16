import type { IPushSubscriptionRepository } from '@repositories/interfaces/push-subscription.repository';
import type {
  PushSubscriptionRecord,
  UpsertPushSubscriptionInput,
} from '@app-types/push';
import { PushSubscriptionModel } from '@models/PushSubscriptionModel';
import { mapPushSubscription } from '@repositories/mappers';

export class PushSubscriptionRepository implements IPushSubscriptionRepository {
  async upsert(input: UpsertPushSubscriptionInput): Promise<PushSubscriptionRecord> {
    const doc = await PushSubscriptionModel.findOneAndUpdate(
      { endpoint: input.endpoint },
      {
        userId: input.userId,
        endpoint: input.endpoint,
        keys: input.keys,
        userAgent: input.userAgent,
      },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
    );
    return mapPushSubscription(doc!);
  }

  async deleteByUserAndEndpoint(userId: string, endpoint: string): Promise<boolean> {
    const result = await PushSubscriptionModel.deleteOne({ userId, endpoint });
    return result.deletedCount === 1;
  }

  async listByUser(userId: string): Promise<PushSubscriptionRecord[]> {
    const docs = await PushSubscriptionModel.find({ userId }).sort({ createdAt: -1 });
    return docs.map(mapPushSubscription);
  }

  async listAll(): Promise<PushSubscriptionRecord[]> {
    const docs = await PushSubscriptionModel.find().sort({ createdAt: -1 });
    return docs.map(mapPushSubscription);
  }

  async deleteByEndpoint(endpoint: string): Promise<boolean> {
    const result = await PushSubscriptionModel.deleteOne({ endpoint });
    return result.deletedCount === 1;
  }
}
