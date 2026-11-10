import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProjectRequest extends Document {
  projectType: string;
  name: string;
  email: string;
  phone: string;
  answers: Record<string, string | string[]>;
  emailed: boolean;
  createdAt: Date;
}

const ProjectRequestSchema = new Schema<IProjectRequest>(
  {
    projectType: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    answers: { type: Schema.Types.Mixed, required: true },
    emailed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const ProjectRequest: Model<IProjectRequest> =
  mongoose.models.ProjectRequest || mongoose.model<IProjectRequest>('ProjectRequest', ProjectRequestSchema);

export default ProjectRequest;
