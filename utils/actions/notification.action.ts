import { GetNotificationsParams } from "@/lib/types";
import { connectToDatabase } from "../connect";
import Notification from "../models/notification.model";
import User from "../models/user.model";

export async function getNotifications(params: GetNotificationsParams) {
  try {
    await connectToDatabase();

    const { userId } = params;

    const notifications = await Notification.find({ userId }).sort({
      createdAt: -1,
    });

    await User.updateOne(
      { _id: userId },
      { $set: { hasNotifications: false } }
    );

    return notifications;
  } catch (error) {
    console.log(error);
  }
}
