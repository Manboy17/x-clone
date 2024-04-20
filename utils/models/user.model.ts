import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  name: string;
  username: string;
  password: string;
  bio?: string;
  email: string;
  image?: string;
  imageCover?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
  followingIds: string[];
  hasNotifications?: boolean;

  posts: Schema.Types.ObjectId;
  comments: Schema.Types.ObjectId;
  notifications: Schema.Types.ObjectId;
}

const UserSchema = new Schema<IUser>({
  id: { type: String, auto: true, unique: true },
  name: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String },
  email: { type: String, required: true },
  image: { type: String },
  imageCover: { type: String },
  profileImage: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  followingIds: { type: [String], default: [] },
  hasNotifications: { type: Boolean },
});

const User = models.User || model("User", UserSchema);

export default User;
