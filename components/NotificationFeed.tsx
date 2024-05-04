import { getTimestamp } from "@/lib/utils";
import { getNotifications } from "@/utils/actions/notification.action";
import { INotification } from "@/utils/models/notification.model";
import React from "react";

interface NotificationFeedProps {
  userId: string;
}

const NotificationFeed = async ({ userId }: NotificationFeedProps) => {
  const notifications: INotification[] | undefined = await getNotifications({
    userId,
  });
  if (notifications?.length === 0) {
    return (
      <div className="text-gray-500 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {notifications?.map((n) => (
        <div
          key={n.id}
          className="flex items-center justify-between border-b-[1px] p-3"
        >
          <p className="text-medium text-sm">{n.description}</p>
          <span className="text-xs font-semibold">
            {getTimestamp(n.createdAt)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NotificationFeed;
