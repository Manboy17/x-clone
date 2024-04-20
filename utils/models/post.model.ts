import { Document, Schema, model, models } from "mongoose";

export interface IPost extends Document {
  id: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  likedIds: string[];

  user: Schema.Types.ObjectId;
  comment: Schema.Types.ObjectId;
}

const PostSchema = new Schema<IPost>({
  id: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
  likedIds: { type: [String], default: [] },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  comment: { type: Schema.Types.ObjectId, ref: "Comment" },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
