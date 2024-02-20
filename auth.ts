import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";

export const config = {
  theme: {
    logo: "/elavor.png",
  },
  providers: [
    CredentialsProvider({
      name: "email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          const result = await fetch(
            "https://elavor.vercel.app/api/user/verify",
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({ email, password }),
            }
          );
          if (result.ok) {
            const json = await result.json();
            return json;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
    Google,
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as IUserSession).role;
        token.id = (user as IUserSession)._id;
      }
      return token;
    },
    session({ session, token }: any) {
      if (session?.user) {
        (session.user as IUserSession).role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
