import mongoose, { Schema, type Model } from 'mongoose';

export interface ISafepayWebhookEvent {
  eventId: string;
  type: string;
  payload: string;
  receivedAt: Date;
}

const schema = new Schema<ISafepayWebhookEvent>({
  eventId: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  payload: { type: String, required: true },
  receivedAt: { type: Date, required: true, default: Date.now },
});

const SafepayWebhookEvent: Model<ISafepayWebhookEvent> =
  (mongoose.models.SafepayWebhookEvent as Model<ISafepayWebhookEvent> | undefined) ||
  mongoose.model<ISafepayWebhookEvent>('SafepayWebhookEvent', schema);

export default SafepayWebhookEvent;
