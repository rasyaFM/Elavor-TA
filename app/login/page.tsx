"use client";
import SectionHeaders from "@/components/sectionHeaders";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  const router = useRouter();

  async function handleFormSubmit(ev: FormEvent) {
    ev.preventDefault();
    setLoginInProgress(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });
      if (res?.error) {
        console.log(res);
        alert("Password or email wrong");
      } else {
        window.location.replace("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        alert(error.message);
      } else {
        console.log(error);
      }
    }

    setLoginInProgress(false);
  }
  return (
    <section className="mt-8 mb-12">
      <div className="text-center mb-4">
        <SectionHeaders mainHeader={"Login"} subHeader={""} />
      </div>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          className="hover:border-fourth"
          type="email"
          name="email"
          placeholder="email"
          value={email}
          disabled={loginInProgress}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          className="mb-3 hover:border-fourth"
          type="password"
          name="password"
          placeholder="password"
          value={password}
          disabled={loginInProgress}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button
          disabled={loginInProgress}
          type="submit"
          className="hover:bg-fourth hover:text-second"
        >
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          type="submit"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center hover:bg-fourth hover:text-second"
        >
          <Image src={"/google.png"} alt={""} width={24} height={24} />
          Login with google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-2">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="hover:text-primary underline">Register</Link>
        </div>
      </form>
    </section>
  );
}
