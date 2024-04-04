import { Bell, Bookmark, Home, Settings, User } from "lucide-react";

export type LinkType = {
  href: string;
  value: string;
  icon: any;
};

export const links = [
  {
    href: "/",
    value: "Home",
    icon: Home,
  },
  {
    href: "/notifications",
    value: "Notifications",
    icon: Bell,
  },
  {
    href: "/bookmarks",
    value: "Bookmarks",
    icon: Bookmark,
  },
  {
    href: "/profile",
    value: "Profile",
    icon: User,
  },
  {
    href: "/settings",
    value: "Settings",
    icon: Settings,
  },
];
