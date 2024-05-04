"use client";

import { Bookmark, Heart, MessageCircle } from "lucide-react";
import React from "react";

const InteractionPanel = () => {
  return (
    <div className="flex items-center justify-end pt-2 gap-5">
      <Heart className="w-[20px] h-[20px] cursor-pointer" />
      <MessageCircle className="w-[20px] h-[20px] cursor-pointer" />
      <Bookmark className="w-[20px] h-[20px] cursor-pointer" />
    </div>
  );
};

export default InteractionPanel;
