"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface HeaderProps {
  showArrowBack?: boolean;
  label: string;
}

const Header = ({ showArrowBack, label }: HeaderProps) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <div className="border-b-1 border-neutral-800 p-3">
      <div className="flex flex-row items-center gap-2">
        {showArrowBack && (
          <ChevronLeft
            size={20}
            className="cursor-pointer hover:opacity-74 transition"
            onClick={handleClick}
          />
        )}
        <h1 className="text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
