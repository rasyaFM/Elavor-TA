"use client";

import OrderTable from "@/components/module/dashboard/order/OrderTable";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  const { data: session } = useSession();
  const user: IUserSession = session?.user ?? {};

  if (user.role == "admin" || user.role == "organizer") {
    return (
      <div>
        <OrderTable />
      </div>
    );
  } else {
    redirect("/");
  }
};

export default Page;
