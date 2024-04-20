import Header from "@/components/Header";
import UserBio from "@/components/UserBio";
import UserHero from "@/components/UserHero";
import { getUserById } from "@/utils/actions/user.action";
import { IUser } from "@/utils/models/user.model";
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
  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <Header showArrowBack label={user.name} />
      <UserHero user={JSON.stringify(user)} />
      <UserBio user={JSON.stringify(user)} />
    </div>
  );
};

export default Profile;
