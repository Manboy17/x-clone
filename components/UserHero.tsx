"use client";

import { IUser } from "@/utils/models/user.model";
import Image from "next/image";
import React from "react";
import Avatar from "./Avatar";
import { parseUser } from "@/utils/helpers";

interface UserHeroProps {
  user: string;
}

const UserHero = ({ user }: UserHeroProps) => {
  const parsedUser: IUser = parseUser(user);
  return (
    <div className="w-full bg-neutral-200 dark:bg-gray-600 h-44 relative">
      {parsedUser?.imageCover && (
        <Image
          src={parsedUser?.imageCover}
          alt="cover image"
          fill
          className="object-cover"
        />
      )}
      <div className="absolute -bottom-16 left-4">
        <Avatar user={user} isLarge hasBorder />
      </div>
    </div>
  );
};

export default UserHero;
