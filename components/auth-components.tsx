import { signIn, signOut } from "auth"
import { Button } from "./ui/button"
import CustomLink from "./custom-link"

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
      className="flex items-center gap-4"
    >
      <CustomLink href="/login" className="text-primary hover:text-third font-semibold text-l">
        Login
      </CustomLink>
      <CustomLink href="/register">
        <Button {...props} className="text-white hover:text-second hover:bg-third">Register</Button>
      </CustomLink>
    </form>
  )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({redirectTo: "/"})
      }}
      className="w-full"
    >
        <Button  variant="ghost" className="w-full p-0" {...props}>
          Sign Out
        </Button>
    </form>
  )
}
