import { SearchIcon } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

const Search = () => {
  return (
    <div className="w-full flex items-center border-[1px] px-2 flex-1 rounded-lg">
      <SearchIcon className="w-[10] h-[10] cursor-pointer text-gray-500" />
      <Input placeholder="Search..." className="border-none no-focus" />
    </div>
  );
};

export default Search;
