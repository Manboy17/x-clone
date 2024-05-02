import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
import NotificationFeed from "@/components/NotificationFeed";
import { SessionUserProps } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Notifications = async () => {
  const session: SessionUserProps | null = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("login");
  }

  return (
    <div>
      <Header showArrowBack label="Notifications" />
      <NotificationFeed userId={session?.user.id} />
    </div>
  );
};

export default Notifications;
