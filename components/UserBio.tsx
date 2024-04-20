"use client";

import { SessionUserProps } from "@/lib/types";
import { parseUser } from "@/utils/helpers";
import { IUser } from "@/utils/models/user.model";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import React, { useMemo } from "react";
import { Button } from "./ui/button";
import { CalendarDays } from "lucide-react";
import EditPopover from "./form/EditPopover";

interface UserBioProps {
  user: string;
}

const UserBio = ({ user }: UserBioProps) => {
  const { data: session } = useSession() as { data: SessionUserProps | null };
  const parsedUser: IUser = parseUser(user);

  const createdAt = useMemo(() => {
    if (!parsedUser.createdAt) {
      return null;
    }

    return format(new Date(parsedUser.createdAt), "MMMM yyyy");
  }, [parsedUser?.createdAt]);
  return (
    <div className="pb-4 border-b">
      <div className="flex justify-end p-2">
        {parsedUser?._id === session?.user.id ? (
          <EditPopover user={parsedUser} />
        ) : (
          <Button>Follow</Button>
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <h2 className="font-semibold text-lg md:text-xl">
            {parsedUser.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            @{parsedUser.username}
          </p>
        </div>
        <div className="mt-4">
          <p className="w-full text-sm md:text-md">{parsedUser?.bio}</p>
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <CalendarDays size={20} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <p className="font-semibold flex items-center gap-1">
            {parsedUser?.followingIds?.length}{" "}
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Following
            </span>
          </p>
          <p className="font-semibold flex items-center gap-1">
            0{" "}
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Followers
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
