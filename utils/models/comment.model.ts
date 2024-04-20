import { Document, Schema, model, models } from "mongoose";

export interface IComment extends Document {
  id: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  postId: string;

  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
}

const CommentSchema = new Schema<IComment>({
  id: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
  postId: { type: String, required: true },

  user: { type: Schema.Types.ObjectId, ref: "User" },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
});

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
