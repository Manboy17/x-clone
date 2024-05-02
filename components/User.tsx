"use client";

import React from "react";
import Avatar from "./Avatar";
import { IUser } from "@/utils/models/user.model";
import { parseUser } from "@/utils/helpers";

interface UserProps {
  user: string;
}

const User = ({ user }: UserProps) => {
  const parsedUser: IUser = parseUser(user);

  return (
    <div className="max-xs:min-w-full">
      <article className="flex w-full items-center gap-5 p-5 border rounded-xl">
        <Avatar user={user} isMedium />
        <div className="flex flex-col">
          <h1 className="font-semibold md:text-lg">{parsedUser.name}</h1>
          <h2 className="text-sm">{parsedUser.username}</h2>
          <p className="text-xs mt-2 text-gray-500">
            {parsedUser.followerIds.length} followers
          </p>
        </div>
      </article>
    </div>
  );
};

export default User;
