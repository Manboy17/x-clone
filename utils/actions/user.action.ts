"use server";

import { UpdateUserParams } from "@/lib/types";
import { connectToDatabase } from "../connect";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

export async function getAllUsers() {
  try {
    await connectToDatabase();

    const users = await User.find();

    if (!users) {
      throw new Error("No users found");
    }

    return users;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById({ userId }: { userId: string | undefined }) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    await connectToDatabase();

    const { id, user, path } = params;
    const { name, username, bio, profileImage, imageCover } = user;

    const userToEdit = await User.findById(id);
    if (!userToEdit) {
      throw new Error("User not found");
    }

    userToEdit.name = name;
    userToEdit.username = username;
    userToEdit.bio = bio;
    userToEdit.profileImage = profileImage;
    userToEdit.imageCover = imageCover;

    await userToEdit.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
