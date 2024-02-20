import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

async function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default RootLayout;
