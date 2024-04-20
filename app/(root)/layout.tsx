import "../globals.css";
import LeftSide from "@/components/LeftSide";
import RightSide from "@/components/RightSide";

import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <main className="mx-auto max-w-7xl w-full">
      <div className="flex">
        <LeftSide />
        <section className="flex min-h-screen flex-1 flex-col">
          <div>{children}</div>
        </section>
        <RightSide />
      </div>
    </main>
  );
};

export default RootLayout;
