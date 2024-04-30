import Search from "@/components/Search";
import Select from "@/components/SelectMenu";
import User from "@/components/User";
import { getAllUsers } from "@/utils/actions/user.action";
import { IUser } from "@/utils/models/user.model";
import React from "react";

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

const UsersPage = async ({ searchParams }: SearchParamsProps) => {
  const users: IUser[] =
    (await getAllUsers({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
    })) ?? [];

  return (
    <div className="p-3 md:p-5">
      <h1 className="text-xl font-medium">Users</h1>
      <div className="w-full flex flex-col items-start sm:flex-row sm:items-center pt-5 gap-2">
        <Search />
        <Select />
      </div>
      {users.length > 0 ? (
        <div className="mt-7 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {users?.map((user) => (
            <User key={user._id} user={JSON.stringify(user)} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-[200px] text-md lg:text-lg fond-medium">
          No Results!
        </div>
      )}
    </div>
  );
};

export default UsersPage;
