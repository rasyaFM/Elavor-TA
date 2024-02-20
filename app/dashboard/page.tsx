"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const user: IUserSession = session?.user ?? {};

  if (user.role == "admin") {
    redirect("/dashboard/user");
  } else if (user.role == "organizer") {
    redirect("/dashboard/package");
  }
  redirect("/");
};

export default Page;
