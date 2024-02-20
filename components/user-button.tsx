import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { auth } from "auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { SignIn, SignOut } from "./auth-components"
import CustomLink from "./custom-link"


export default async function UserButton() {
  const session = await auth()
  if (!session?.user) return <SignIn />
  return (
    <div className="flex gap-2 items-center">
    <CustomLink href="/profile">
        <Button className="p-0 text-semibold text-third border-0 bg-0 text-xs hover:bg-second hover:text-bold hover:text-fourth hover:text-base">
          {session.user.name}
        </Button>
    </CustomLink>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-12 h-12 rounded-full hover:bg-primary">
          <Avatar className="w-10 h-10">
            {session.user.image && (
              <AvatarImage
                src={session.user.image}
                alt={session.user.name ?? ""}
              />
            )}
            <AvatarFallback>{session.user.email}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-second border-fourth" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem >
          <SignOut className="bg-third text-white"/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}
