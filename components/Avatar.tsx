"use client";

import { parseUser } from "@/utils/helpers";
import { IUser } from "@/utils/models/user.model";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface AvatarProps {
  user: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar = ({ user, isLarge, hasBorder }: AvatarProps) => {
  const router = useRouter();
  const parsedUser: IUser = parseUser(user);
  console.log(parsedUser.imageCover);

  const handleClick = useCallback((e: any) => {
    e.stopPropagation();

    router.replace(`/profile/${parsedUser._id}`);
  }, []);
  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""}
        ${isLarge ? "h-32 w-32" : "h-12 w-12"}
        rounded-full
        hover:opacity-90
        transition
        cursor-pointer
        relative

    `}
    >
      <Image
        src={parsedUser?.profileImage ?? "/assets/placeholder.png"}
        className="object-cover rounded-full"
        fill
        alt="profile image"
        onClick={handleClick}
      />
    </div>
  );
};

export default Avatar;
