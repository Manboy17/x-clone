"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectMenu = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px] no-focus text-muted-foreground">
        <SelectValue placeholder="Followers" />
      </SelectTrigger>
      <SelectContent className="text-muted-foreground">
        <SelectItem value="light">Acs</SelectItem>
        <SelectItem value="dark">Desc</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectMenu;
