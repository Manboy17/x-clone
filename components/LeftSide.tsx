"use client";

import { LinkType, links } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Feather, LogIn, LogOut, Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import FormPopover from "./form/FormPopover";
import { SessionUserProps } from "@/lib/types";

interface LeftSideProps {
  notifications: string;
}

const LeftSide = ({ notifications }: LeftSideProps) => {
  const pathname = usePathname();
  const { data: session, status } = useSession() as {
    data: SessionUserProps | null;
    status: string;
  };
  const userId = session?.user?.id;

  const basePathname = pathname.split("/")[1];
  const parsedNotifications = JSON.parse(notifications) as Notification[];

  return (
    <div className="flex flex-col p-3 md:p-5 border-r sticky left-0 top-0 h-screen lg:w-[260px]">
      <Link href="/" className="text-xl font-bold lg:text-left text-center">
        Xsify
      </Link>
      <div className="flex justify-center items-center lg:items-start flex-col gap-y-7 pt-6">
        {links.map((link: LinkType) => {
          const baseLinkHref = link.href.split("/")[1];

          return (
            <Link
              key={link.href}
              href={
                link.href === "/profile/:id" ? `/profile/${userId}` : link.href
              }
              className={cn(
                "flex items-center gap-x-5 text-md lg:text-lg tracking-wide hover:text-orange-500 transition",
                basePathname === baseLinkHref && "font-semibold text-orange-500"
              )}
            >
              {link.value === "Notifications" ? (
                <div className="relative flex items-center gap-x-5">
                  <link.icon size={25} />
                  <p className="hidden lg:block">{link.value}</p>
                  {parsedNotifications.length > 0 && (
                    <div className="absolute w-3 h-3 bg-orange-500 rounded-full -top-1 left-3" />
                  )}
                </div>
              ) : (
                <>
                  <link.icon size={25} />
                  <p className="hidden lg:block">{link.value}</p>
                </>
              )}
            </Link>
          );
        })}
        <FormPopover sideOffset={10} align="center" side="right">
          <div className="flex items-center gap-x-5 text-lg tracking-wide hover:text-orange-500 transition cursor-pointer">
            <Settings />
            <p className="hidden lg:block">Settings</p>
          </div>
        </FormPopover>
        {status === "authenticated" ? (
          <div
            className="flex items-center gap-x-5 text-lg tracking-wide hover:text-orange-500 transition cursor-pointer"
            onClick={() => signOut()}
          >
            <LogOut />
            <p className="hidden lg:block">Log out</p>
          </div>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-x-5 text-lg tracking-wide hover:text-orange-500 transition"
          >
            <LogIn />
            <p className="hidden lg:block">Log in</p>
          </Link>
        )}
        <Button
          className="flex lg:hidden rounded-full"
          variant="organge"
          size="icon"
        >
          <Feather size={25} color="white" />
        </Button>
        <Button
          className="w-full py-y px-4 text-white font-semibold hidden lg:block"
          variant="organge"
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default LeftSide;
