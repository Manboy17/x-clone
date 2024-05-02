import "../globals.css";
import LeftSide from "@/components/LeftSide";
import RightSide from "@/components/RightSide";
import { SessionUserProps } from "@/lib/types";
import { getServerSession } from "next-auth";

import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getNotifications } from "@/utils/actions/notification.action";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const session: SessionUserProps | null = await getServerSession(authOptions);
  let userId;
  if (session?.user) {
    userId = session?.user.id;
  }

  const notifications = await getNotifications({ userId: userId! });

  return (
    <main className="mx-auto max-w-7xl w-full">
      <div className="flex">
        <LeftSide notifications={JSON.stringify(notifications)} />
        <section className="flex min-h-screen flex-1 flex-col">
          <div>{children}</div>
        </section>
        <RightSide />
      </div>
    </main>
  );
};

export default RootLayout;
