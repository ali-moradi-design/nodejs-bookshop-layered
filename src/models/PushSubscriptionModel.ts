import { Schema, model, Document, Types } from 'mongoose';

export interface IPushSubscriptionKeys {
  p256dh: string;
  auth: string;
}

export interface IPushSubscriptionDoc extends Document {
  userId: Types.ObjectId;
  endpoint: string;
  keys: IPushSubscriptionKeys;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const pushSubscriptionSchema = new Schema<IPushSubscriptionDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    endpoint: { type: String, required: true, unique: true, trim: true },
    keys: {
      p256dh: { type: String, required: true },
      auth: { type: String, required: true },
    },
    userAgent: { type: String, trim: true },
  },
  { timestamps: true },
);

pushSubscriptionSchema.index({ userId: 1, endpoint: 1 });

export const PushSubscriptionModel = model<IPushSubscriptionDoc>(
  'PushSubscription',
  pushSubscriptionSchema,
);
