import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
import UserBio from "@/components/UserBio";
import UserHero from "@/components/UserHero";
import { SessionUserProps } from "@/lib/types";
import { getUserById } from "@/utils/actions/user.action";
import { IUser } from "@/utils/models/user.model";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Profile = async ({
  params: { userId },
}: {
  params: {
    userId: string;
  };
}) => {
  const user: IUser = await getUserById({ userId });
  const session: SessionUserProps | null = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div>
      <Header showArrowBack label={user.name} />
      <UserHero user={JSON.stringify(user)} />
      <UserBio
        user={JSON.stringify(user)}
        currentUserId={session.user.id}
        userIdToFollow={user._id.toString()}
      />
    </div>
  );
};

export default Profile;
