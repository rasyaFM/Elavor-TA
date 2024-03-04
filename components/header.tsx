import { auth } from "@/auth";
import { MainNav } from "./main-nav";
import UserButton from "./user-button";
import { SessionProvider } from "next-auth/react";

export default async function Header() {
  const session = await auth();
  return (
    <header className="sticky flex justify-center border-b shadow-md bg-second dark:bg-third z-50 ">
      <div className="flex items-center justify-between w-full h-16 max-w-7xl px-4 mx-auto sm:px-6">
        <SessionProvider session={session}>
          <MainNav />
        </SessionProvider>
        <UserButton />
      </div>
    </header>
  );
}
