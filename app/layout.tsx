import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ELAVOR",
  description: "Entire Leads All Event Organizer",
};

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col justify-between w-full h-full min-h-screen">
          <Header />
          <main className="flex-auto w-full max-w-6xl p-6 mx-auto">
            <SessionProvider session={session}>{children}</SessionProvider>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
