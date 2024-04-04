"use client";

import { User } from "lucide-react";
import Image from "next/image";
import React from "react";
import avatar from "../public/assets/person.jpg";
import Link from "next/link";
import { Button } from "./ui/button";

const users = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    avatar: "",
  },
  {
    id: 2,
    name: "Denys Hlushchenko",
    username: "manboy17",
    avatar: avatar,
  },
];

const RightSide = () => {
  return (
    <div className="hidden lg:flex flex-col p-3 md:p-5 border-l sticky right-0 top-0 h-screen lg:w-[350px]">
      <div className="bg-gray-100 dark:bg-black/50 dark:border dark:border-gray-600 rounded-lg w-full">
        <h1 className="pt-3 pl-3 font-bold text-lg">Who to follow</h1>
        <div className="pt-4 flex flex-col items-start">
          {users.map((user) => (
            <Link
              href="/"
              className="flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-800 transition w-full p-3"
              key={user.id}
            >
              <div className="flex items-center gap-x-2">
                {!user.avatar ? (
                  <div className="w-[40px] h-[40px] bg-gray-300 flex items-center justify-center rounded-full cursor-pointer">
                    <User />
                  </div>
                ) : (
                  <Image
                    src={user.avatar}
                    alt="user"
                    width={40}
                    height={40}
                    className="rounded-full object-contain"
                  />
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{user.name}</span>
                  <span className="text-sm text-gray-500">
                    @{user.username}
                  </span>
                </div>
              </div>
              <Button size="sm" className="text-xs rounded-full">
                Follow
              </Button>
            </Link>
          ))}
        </div>
        <div className="p-3 hover:bg-gray-200 dark:hover:bg-gray-800">
          <Link href="/users" className="text-sm text-orange-500 font-medium">
            Show more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
