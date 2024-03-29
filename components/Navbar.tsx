"use client";

import { signOut } from "next-auth/react";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <button className="bg-red-400" onClick={() => signOut()}>
        Log out
      </button>
    </div>
  );
};

export default Navbar;
