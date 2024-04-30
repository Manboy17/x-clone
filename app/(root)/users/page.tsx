import Search from "@/components/Search";
import Select from "@/components/SelectMenu";
import User from "@/components/User";
import { getAllUsers } from "@/utils/actions/user.action";
import React from "react";

const UsersPage = async () => {
  const users = await getAllUsers();

  return (
    <div className="p-3 md:p-5">
      <h1 className="text-xl font-medium">Users</h1>
      <div className="w-full flex flex-col items-start sm:flex-row sm:items-center pt-5 gap-2">
        <Search />
        <Select />
      </div>
      <div className="mt-7 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {users?.map((user) => (
          <User key={user._id} user={JSON.stringify(user)} />
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
