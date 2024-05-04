"use server";

import { CreatePostParams } from "@/lib/types";
import { connectToDatabase } from "../connect";
import Post from "../models/post.model";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";

export async function createPost(params: CreatePostParams) {
  try {
    await connectToDatabase();

    const { user, description, path } = params;

    const newPost = await Post.create({
      id: new Date().getTime().toString(),
      user,
      description,
    });

    revalidatePath(path);
    return newPost;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllPosts() {
  try {
    await connectToDatabase();

    const posts = await Post.find()
      .populate({
        path: "user",
        model: User,
        select: "name username profileImage",
      })
      .sort({ createdAt: -1 });

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function getPostsByUserId({ userId }: { userId: string }) {
  try {
    await connectToDatabase();

    const posts = await Post.find({ user: userId })
      .populate({
        path: "user",
        model: User,
        select: "name username profileImage",
      })
      .sort({ createdAt: -1 });

    return posts;
  } catch (error) {
    console.log(error);
  }
}
