"use client";
import CustomLink from "@/components/custom-link";
import SectionHeaders from "@/components/sectionHeaders";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  async function handleFormSubmit(ev: FormEvent) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, name, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setUserCreated(true);
      router.push("/login")
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }
  return (
    <section className="mt-8 mb-12">
      <div className="text-center mb-4">
        <SectionHeaders mainHeader={"Register"} subHeader={""}/>
      </div>
      {userCreated && (
        <div className="my-4 text-center">
          User created.
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          An error has occurred.
          <br />
          Please try again later
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          className="hover:border-fourth"
          type="nameReg"
          placeholder="name"
          value={name}
          disabled={creatingUser}
          onChange={(ev) => setName(ev.target.value)}
        />
        <input
          className="hover:border-fourth"
          type="email"
          placeholder="email"
          value={email}
          disabled={creatingUser}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          className="mb-3 hover:border-fourth"
          type="password"
          placeholder="password"
          value={password}
          disabled={creatingUser}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button

          className="hover:bg-fourth hover:text-second"
          type="submit"
          disabled={creatingUser}
          >
            Register
          </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center hover:bg-fourth hover:text-second"
        >
          <Image src={"/google.png"} alt={""} width={24} height={24} />
          Login with google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-2">
          Existing account?{" "}
          <Link className="underline" href={"/login"}>
            Login here
          </Link>
        </div>
      </form>
    </section>
  );
}
