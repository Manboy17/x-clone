"use client";

import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { formUrlQuery, removeUrlQuery } from "@/lib/utils";

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search.toLowerCase(),
        });

        router.replace(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });

          router.replace(newUrl, { scroll: false });
        }
      }

      return () => clearTimeout(delayDebounceFn);
    }, 300);
  }, [search, router, searchParams, pathname, query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full flex items-center border-[1px] px-2 flex-1 rounded-lg">
      <SearchIcon className="w-[10] h-[10] cursor-pointer text-gray-500" />
      <Input
        placeholder="Search..."
        className="border-none no-focus"
        value={search}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
