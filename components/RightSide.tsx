import React from "react";
import Link from "next/link";
import { getAllUsers } from "@/utils/actions/user.action";
import { IUser } from "@/utils/models/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { SessionUserProps } from "@/lib/types";
import Avatar from "./Avatar";
import { Star } from "lucide-react";

const RightSide = async () => {
  const users: IUser[] | undefined = await getAllUsers();
  const session: SessionUserProps | null = await getServerSession(authOptions);

  return (
    <div className="hidden lg:flex flex-col p-3 md:p-5 border-l sticky right-0 top-0 h-screen lg:w-[350px]">
      <div className="bg-gray-100 dark:bg-black/50 dark:border dark:border-gray-600 rounded-lg w-full">
        <h1 className="pt-3 pl-3 font-bold text-lg">Who to follow</h1>
        <div className="pt-4 flex flex-col items-start">
          {users?.map((user) => (
            <div
              className="flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-800 transition w-full p-3"
              key={user._id.toString()}
            >
              <div className="flex items-center gap-x-2">
                <Avatar user={JSON.stringify(user)} />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{user.name}</span>
                  <span className="text-sm text-gray-400 dark:text-gray-500">
                    @{user.username}
                  </span>
                </div>
              </div>
              {session?.user.id === user._id.toString() && (
                <Star className="w-[10] h-[10] text-orange-500" />
              )}
            </div>
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
