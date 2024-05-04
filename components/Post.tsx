"use client";

import React from "react";
import Avatar from "./Avatar";
import InteractionPanel from "./InteractionPanel";
import { formatDate } from "@/lib/utils";

interface PostProps {
  user: string;
  post: string;
}

const Post = ({ user, post }: PostProps) => {
  const parsedPost = JSON.parse(post);
  return (
    <div className="border-b-[1px] p-3">
      <div className="flex gap-2">
        <Avatar user={user} />
        <div className="flex gap-2">
          <span className="text-sm md:text-base font-semibold">
            {parsedPost.user.name}
          </span>
          <span className="text-sm md:text-base text-gray-500">
            @{parsedPost.user.username}
          </span>
        </div>
      </div>
      <p className="pt-2 text-xs sm:text-sm md:text-base">
        {parsedPost.description}
      </p>
      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400 pt-1">
        {formatDate(parsedPost.createdAt)}
      </span>
      <InteractionPanel />
    </div>
  );
};

export default Post;
