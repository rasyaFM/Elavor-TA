import { auth } from "@/auth";
import { Boxes, SendToBack, UserCog } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import React from "react";

async function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  const session = await auth();

  const user: IUserSession = session?.user ?? {};

  const menu = () => {
    if (user.role == "admin") {
      return (
        <>
          <li>
            <Link href={"/dashboard/user"} className="font-semibold">
              <UserCog size={18} /> USER CONTROL
            </Link>
          </li>
          <li>
            <Link href={"/dashboard/package"} className="font-semibold">
              <Boxes size={18} /> PACKAGE CONTROL
            </Link>
          </li>
          <li>
            <Link href={"/dashboard/order"} className="font-semibold">
              <SendToBack size={18} /> ORDER LIST
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link href={"/dashboard/package"} className="font-semibold">
              <Boxes size={18} /> PACKAGE CONTROL
            </Link>
          </li>
          <li>
            <Link href={"/dashboard/order"} className="font-semibold">
              <SendToBack size={18} /> ORDER LIST
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <div className="drawer ml-[-80px] my-[-25px] z-10 lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ml-5 mr-[-80px]">
        {/* Page content here */}
        <SessionProvider session={session}>{children}</SessionProvider>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button fixed top-0 lg:hidden"
        >
          Open Sidebar
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-50 min-h-full bg-base-200 text-base-content gap-2">
          {/* Sidebar content here */}
          {menu()}
        </ul>
      </div>
    </div>
  );
}

export default RootLayout;
