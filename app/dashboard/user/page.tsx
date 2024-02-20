"use client";

import UserTable from "@/components/module/dashboard/user/UserTable";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  const { data: session } = useSession();
  const user: IUserSession = session?.user ?? {};

  if (user.role == "admin") {
    return (
      <div>
        <UserTable />
      </div>
    );
  }
  return redirect("/");
};

export default Page;
