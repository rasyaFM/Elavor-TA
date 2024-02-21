"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import CustomLink from "./custom-link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import React from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function MainNav() {
  const { data: session } = useSession();
  const user: IUserSession = session?.user ?? {};

  const OnlyAdmin = () => {
    if (user.role == "admin" || user.role == "organizer") {
      return (
        <NavigationMenuItem>
          <Link href="/dashboard" className={navigationMenuTriggerStyle()}>
            Dashboard
          </Link>
        </NavigationMenuItem>
      );
    }
  };

  return (
    <div className="flex bg-second items-center space-x-2 lg:space-x-6">
      <CustomLink href="/" className="flex items-center">
        <Button className="p-0 bg-second border-0 hover:bg-0">
          <Image src="/elavor.png" alt="Home" width="32" height="32" />
          <h2 className="font-semibold text-xl text-third">Elavor</h2>
        </Button>
      </CustomLink>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/package" className={navigationMenuTriggerStyle()}>
              Package
            </Link>
          </NavigationMenuItem>
          {OnlyAdmin()}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
