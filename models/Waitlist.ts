import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWaitlist extends Document {
  email: string;
  role?: string;
  source?: string;
  createdAt: Date;
}

const WaitlistSchema: Schema = new Schema<IWaitlist>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    role: {
      type: String,
      default: 'Institution Owner / Leader',
    },
    source: {
      type: String,
      default: 'Website Waitlist Modal',
    },
  },
  {
    timestamps: true,
  }
);

const Waitlist: Model<IWaitlist> =
  mongoose.models.Waitlist || mongoose.model<IWaitlist>('Waitlist', WaitlistSchema);

export default Waitlist;
