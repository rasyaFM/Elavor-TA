"use client";

import Hero from "@/components/hero";
import RecPack from "@/components/recommended";
import SectionHeaders from "@/components/sectionHeaders";
import { useSession } from "next-auth/react";
import Link from "next/link";

const putOrganizerRequest = async (id: string) => {
  try {
    const put = await fetch("/api/user/" + id, {
      method: "PUT",
    });
    if (put) {
      alert("Berhasil Mengajukan untuk menjadi Organizer");
    }
  } catch (error) {
    console.log(error);
  }
};

export default function Index() {
  const { data: session } = useSession();
  const user: IUserSession = session?.user ?? {};

  const AboutUs = () => {
    if (user.role == "klien") {
      return (
        <>
          <SectionHeaders
            subHeader={"Wanna Be"}
            mainHeader={"an Event Organizer?"}
          />
          <div className="text-gray-500 max-w-xl text-justify mx-auto mt-4 flex flex-col gap-4">
            <p className="text-center">Let's Register Here </p>
            <p>
              Selamat datang di Elavor, Marketplace Organizer pilihan terbaik
              untuk merencanakan acara Anda! Kami menyediakan Event Organizer
              handal dengan fitur Custom Order untuk menyesuaikan detail acara
              sesuai keinginan Anda. Apakah itu pesta pernikahan, konferensi
              bisnis, atau festival budaya, Elavor hadir dengan jaringan EO
              terbaik untuk menciptakan pengalaman tak terlupakan.
            </p>
            Elavor memudahkan Anda menemukan Event Organizer berkualitas tinggi
            yang sesuai dengan visi acara Anda. Platform kami menyediakan EO
            terverifikasi dan berpengalaman, memastikan profesionalisme dalam
            setiap acara. Dengan Elavor, Anda memiliki kontrol penuh untuk
            menentukan tema, dekorasi, dan pengaturan acara secara keseluruhan.
            Mari buat setiap acara menjadi momen istimewa dan tak terlupakan
            dengan Elavor, Marketplace Organizer yang memberikan kebebasan dan
            kenyamanan dalam merencanakan acara impian Anda!
            <p></p>
          </div>
          <div className="text-center mb-10">
            <Link href="/">
              <button
                type="button"
                className="mt-6 mx-auto uppercase w-fit bg-primary text-white rounded-full px-6 py-2 hover:bg-third hover:text-second"
                onClick={() => putOrganizerRequest(user?.id || "")}
              >
                Request Here
              </button>
            </Link>
          </div>
        </>
      );
    }
    if (user.role == "admin" || user.role == "organizer") {
      return (
        <>
          <SectionHeaders
            subHeader={"You are an Organizer"}
            mainHeader={"Let See Your Dashboard"}
          />
          <div className="text-gray-500 max-w-xl text-justify mx-auto mt-4 flex flex-col gap-4">
            <p className="text-center">Let's Register Here </p>
            <p>
              Selamat datang di Elavor, Marketplace Organizer pilihan terbaik
              untuk merencanakan acara Anda! Kami menyediakan Event Organizer
              handal dengan fitur Custom Order untuk menyesuaikan detail acara
              sesuai keinginan Anda. Apakah itu pesta pernikahan, konferensi
              bisnis, atau festival budaya, Elavor hadir dengan jaringan EO
              terbaik untuk menciptakan pengalaman tak terlupakan.
            </p>
            Elavor memudahkan Anda menemukan Event Organizer berkualitas tinggi
            yang sesuai dengan visi acara Anda. Platform kami menyediakan EO
            terverifikasi dan berpengalaman, memastikan profesionalisme dalam
            setiap acara. Dengan Elavor, Anda memiliki kontrol penuh untuk
            menentukan tema, dekorasi, dan pengaturan acara secara keseluruhan.
            Mari buat setiap acara menjadi momen istimewa dan tak terlupakan
            dengan Elavor, Marketplace Organizer yang memberikan kebebasan dan
            kenyamanan dalam merencanakan acara impian Anda!
            <p></p>
          </div>
          <div className="text-center mb-10">
            <Link href="/dashboard">
              <button
                type="button"
                className="mt-6 mx-auto uppercase w-fit bg-primary text-white rounded-full px-6 py-2 hover:bg-third hover:text-second"
              >
                My Dashboard
              </button>
            </Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <SectionHeaders
            subHeader={"Your Event"}
            mainHeader={"Need Event Organizer?"}
          />
          <div className="text-gray-500 max-w-xl text-justify mx-auto mt-4 flex flex-col gap-4">
            <p className="text-center">Let's Register Here </p>
            <p>
              Selamat datang di Elavor, Marketplace Organizer pilihan terbaik
              untuk merencanakan acara Anda! Kami menyediakan Event Organizer
              handal dengan fitur Custom Order untuk menyesuaikan detail acara
              sesuai keinginan Anda. Apakah itu pesta pernikahan, konferensi
              bisnis, atau festival budaya, Elavor hadir dengan jaringan EO
              terbaik untuk menciptakan pengalaman tak terlupakan.
            </p>
            Elavor memudahkan Anda menemukan Event Organizer berkualitas tinggi
            yang sesuai dengan visi acara Anda. Platform kami menyediakan EO
            terverifikasi dan berpengalaman, memastikan profesionalisme dalam
            setiap acara. Dengan Elavor, Anda memiliki kontrol penuh untuk
            menentukan tema, dekorasi, dan pengaturan acara secara keseluruhan.
            Mari buat setiap acara menjadi momen istimewa dan tak terlupakan
            dengan Elavor, Marketplace Organizer yang memberikan kebebasan dan
            kenyamanan dalam merencanakan acara impian Anda!
            <p></p>
          </div>
          <div className="text-center mb-10">
            <Link href="/login">
              <button
                type="button"
                className="mt-6 mx-auto uppercase w-fit bg-primary text-white rounded-full px-6 py-2 hover:bg-third hover:text-second"
              >
                Register Here
              </button>
            </Link>
          </div>
        </>
      );
    }
  };

  return (
    <div className=" space-y-5">
      <Hero />
      <RecPack />
      <section className="text-center my-5">
        <AboutUs />
      </section>
    </div>
  );
}
