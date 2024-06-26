"use server";

import {
  FollowUserParams,
  GetAllUsersParams,
  UnfollowUserParams,
  UpdateUserParams,
} from "@/lib/types";
import { connectToDatabase } from "../connect";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";
import Notification from "../models/notification.model";

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    await connectToDatabase();
    const { searchQuery, filter } = params;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        {
          name: { $regex: searchQuery, $options: "i" },
        },
        {
          username: { $regex: searchQuery, $options: "i" },
        },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "asc":
        sortOptions = { followerIds: 1 };
        break;
      case "desc":
        sortOptions = { followerIds: -1 };
        break;
      default:
        break;
    }

    const users = await User.find(query).sort(sortOptions);

    if (!users) {
      throw new Error("No users found");
    }

    return users;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllSideUsers() {
  try {
    await connectToDatabase();

    const users = await User.find().limit(10);

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

export async function followUser(params: FollowUserParams) {
  try {
    await connectToDatabase();

    const { path, currentUserId, userIdToFollow } = params;

    const currentUser = await User.findById(currentUserId);
    const userToFollow = await User.findById(userIdToFollow);

    if (!currentUser || !userToFollow) {
      throw new Error("User not found!");
    }

    currentUser.followingIds.push(userToFollow._id);

    await currentUser.save();

    userToFollow.followerIds.push(currentUser._id);

    try {
      await Notification.create({
        id: userToFollow._id + currentUser._id,
        description: `${currentUser.username} followed you`,
        userId: userToFollow._id,
      });

      await Notification.updateOne(
        {
          userId: userToFollow._id,
        },
        {
          hasNotifications: true,
        }
      );
    } catch (error) {
      console.log(error);
    }

    await userToFollow.save();
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function unfollowUser(params: UnfollowUserParams) {
  try {
    await connectToDatabase();

    const { path, currentUserId, userIdToUnfollow } = params;

    const currentUser = await User.findById(currentUserId);
    const userToUnfollow = await User.findById(userIdToUnfollow);

    if (!currentUser || !userToUnfollow) {
      throw new Error("User not found!");
    }

    currentUser.followingIds = currentUser.followingIds.filter(
      (id: string) => id.toString() !== userToUnfollow._id.toString()
    );

    await currentUser.save();

    userToUnfollow.followerIds = userToUnfollow.followerIds.filter(
      (id: string) => id.toString() !== currentUser._id.toString()
    );

    await userToUnfollow.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
