"use client";

import React from "react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { themes } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const FormPopover = ({
  children,
  side,
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const { mode, setMode } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-100 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center">Change your Theme</div>
        <PopoverClose asChild>
          <Button
            variant="ghost"
            className="h-auto w-auto p-2 absolute top-2 right-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <div className="pt-5 flex items-center justify-between gap-x-3">
          {themes.map((theme, i) => (
            <Button
              key={i}
              className={cn(
                "flex items-center gap-x-2",
                theme.value === mode &&
                  "border border-orange-500 text-orange-500"
              )}
              variant={
                theme.value === "light" || mode === "dark"
                  ? "outline"
                  : "default"
              }
              onClick={() => {
                setMode(theme.value);

                if (theme.value !== "system") {
                  localStorage.theme = theme.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              <theme.icon className="h-4 w-4" />
              <span>{theme.label}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
