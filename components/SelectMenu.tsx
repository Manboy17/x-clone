"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

const SelectMenu = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get("filter");

  const handleTypeClick = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value: value.toLowerCase(),
    });

    router.replace(newUrl, { scroll: false });
  };

  return (
    <Select
      onValueChange={handleTypeClick}
      defaultValue={paramFilter || undefined}
    >
      <SelectTrigger className="w-[180px] no-focus text-muted-foreground">
        <SelectValue placeholder="Followers" />
      </SelectTrigger>
      <SelectContent className="no-focus text-muted-foreground">
        <SelectItem value="Asc">Asc</SelectItem>
        <SelectItem value="Desc">Desc</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectMenu;
