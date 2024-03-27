import { Schema, model, models } from "mongoose";

export interface INotification extends Document {
  id: string;
  description: string;
  userId: string;
  createdAt: Date;

  user: Schema.Types.ObjectId;
}

const NotificationSchema = new Schema<INotification>({
  id: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },

  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Notification =
  models.Notification || model("Notification", NotificationSchema);

export default Notification;
