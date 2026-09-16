export interface PushSubscriptionKeys {
  p256dh: string;
  auth: string;
}

export interface PushSubscriptionRecord {
  id: string;
  userId: string;
  endpoint: string;
  keys: PushSubscriptionKeys;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpsertPushSubscriptionInput {
  userId: string;
  endpoint: string;
  keys: PushSubscriptionKeys;
  userAgent?: string;
}

export interface PushPayload {
  title: string;
  body: string;
  url?: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: Record<string, unknown>;
}
