"use client";

import { parseUser } from "@/utils/helpers";
import { IUser } from "@/utils/models/user.model";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface AvatarProps {
  user: string;
  isLarge?: boolean;
  isMedium?: boolean;
  hasBorder?: boolean;
}

const Avatar = ({ user, isLarge, isMedium, hasBorder }: AvatarProps) => {
  const router = useRouter();
  const parsedUser: IUser = parseUser(user);

  const handleClick = useCallback((e: any) => {
    e.stopPropagation();

    router.replace(`/profile/${parsedUser._id}`);
  }, []);
  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""}
        ${isLarge ? "h-32 w-32" : "h-12 w-12"}
        ${isMedium ? "h-20 w-20" : "h-12 w-12"}
        rounded-full
        hover:opacity-90
        transition
        cursor-pointer
        relative

    `}
    >
      <Image
        src={
          parsedUser?.profileImage
            ? parsedUser?.profileImage
            : "/assets/placeholder.png"
        }
        className="object-cover rounded-full"
        fill
        alt="profile image"
        onClick={handleClick}
      />
    </div>
  );
};

export default Avatar;
