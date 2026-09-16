import type {
  PushSubscriptionRecord,
  UpsertPushSubscriptionInput,
} from '@app-types/push';

export interface IPushSubscriptionRepository {
  upsert(input: UpsertPushSubscriptionInput): Promise<PushSubscriptionRecord>;
  deleteByUserAndEndpoint(userId: string, endpoint: string): Promise<boolean>;
  listByUser(userId: string): Promise<PushSubscriptionRecord[]>;
  listAll(): Promise<PushSubscriptionRecord[]>;
  deleteByEndpoint(endpoint: string): Promise<boolean>;
}
