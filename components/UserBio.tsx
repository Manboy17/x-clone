"use client";

import { SessionUserProps } from "@/lib/types";
import { parseUser } from "@/utils/helpers";
import { IUser } from "@/utils/models/user.model";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import React, { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { CalendarDays } from "lucide-react";
import EditPopover from "./form/EditPopover";
import { usePathname } from "next/navigation";
import { followUser, unfollowUser } from "@/utils/actions/user.action";

interface UserBioProps {
  user: string;
  currentUserId?: string;
  userIdToFollow: string;
}

const UserBio = ({
  user,
  currentUserId = "",
  userIdToFollow,
}: UserBioProps) => {
  const { data: session } = useSession() as { data: SessionUserProps | null };
  const pathname = usePathname();
  const parsedUser: IUser = parseUser(user);
  const userFollowed = parsedUser.followerIds.includes(currentUserId);
  const [isFollowed, setIsFollowed] = useState(userFollowed);

  const handleFollow = async () => {
    try {
      if (isFollowed) {
        await unfollowUser({
          path: pathname,
          currentUserId,
          userIdToUnfollow: userIdToFollow,
        });
        setIsFollowed(false);
      } else {
        await followUser({
          path: pathname,
          currentUserId,
          userIdToFollow,
        });
        setIsFollowed(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <Button
            size="sm"
            variant={isFollowed ? "destructive" : "default"}
            className="text-xs"
            onClick={handleFollow}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
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
            {parsedUser?.followerIds?.length}{" "}
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
