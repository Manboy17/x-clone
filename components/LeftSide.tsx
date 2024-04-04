"use client";

import { LinkType, links } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Feather, LogIn, LogOut, Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";
import FormPopover from "./form/FormPopover";

const LeftSide = () => {
  const pathname = usePathname();
  const session = useSession();
  return (
    <div className="flex flex-col p-3 md:p-5 border-r sticky left-0 top-0 h-screen">
      <h1 className="text-xl font-bold text-center">Xsify</h1>
      <div className="flex justify-center items-center md:items-start flex-col gap-y-7 pt-6">
        {links.map((link: LinkType) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-x-5 text-md lg:text-lg tracking-wide hover:text-orange-500 transition",
              pathname === link.href && "font-semibold text-orange-500"
            )}
          >
            <link.icon size={25} />
            <p className="hidden md:block">{link.value}</p>
          </Link>
        ))}
        <FormPopover sideOffset={10} align="center" side="right">
          <div className="flex items-center gap-x-5 text-lg tracking-wide hover:text-orange-500 transition cursor-pointer">
            <Settings />
            <p className="hidden md:block">Settings</p>
          </div>
        </FormPopover>
        {session.status === "authenticated" ? (
          <div
            className="flex items-center gap-x-5 text-lg tracking-wide hover:text-orange-500 transition cursor-pointer"
            onClick={() => signOut()}
          >
            <LogOut />
            <p className="hidden md:block">Log out</p>
          </div>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-x-5 text-lg tracking-wide hover:text-orange-500 transition"
          >
            <LogIn />
            <p className="hidden md:block">Log in</p>
          </Link>
        )}
        <Button
          className="flex md:hidden rounded-full"
          variant="organge"
          size="icon"
        >
          <Feather size={25} color="white" />
        </Button>
        <Button
          className="w-full py-y px-4 text-white font-semibold hidden md:block"
          variant="organge"
        >
          Tweet
        </Button>
      </div>
    </div>
  );
};

export default LeftSide;
