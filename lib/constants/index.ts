import { Bell, Bookmark, FolderDot, Home, Moon, Sun, User } from "lucide-react";

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
];

export const themes = [
  {
    icon: Sun,
    label: "Light",
    value: "light",
  },
  {
    icon: Moon,
    label: "Dark",
    value: "dark",
  },
  {
    icon: FolderDot,
    label: "System",
    value: "system",
  },
];
