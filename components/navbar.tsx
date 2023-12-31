import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import { MainNav } from "@/components/main-nav";
import { redirect } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="text-2xl font-bold">
          DOON ADMIN
        </Link>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
