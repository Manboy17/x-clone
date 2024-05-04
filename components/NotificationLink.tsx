import { getNotifications } from "@/utils/actions/notification.action";
import { INotification } from "@/utils/models/notification.model";
import React from "react";

interface NotificationLinkProps {
  icon: React.ElementType;
  value: string;
  userId?: string;
}

const NotificationLink = async ({
  icon: Icon,
  value,
  userId,
}: NotificationLinkProps) => {
  const notifications: INotification[] | undefined = await getNotifications({
    userId: userId!,
  });
  return (
    <div className="relative flex items-center gap-x-5 text-md lg:text-lg tracking-wide hover:text-orange-500 transition">
      {Icon && <Icon size={25} />}
      <p className="hidden lg:block">{value}</p>
      {notifications?.length && (
        <div className="absolute w-3 h-3 bg-orange-500 rounded-full -top-1 left-3" />
      )}
    </div>
  );
};

export default NotificationLink;
