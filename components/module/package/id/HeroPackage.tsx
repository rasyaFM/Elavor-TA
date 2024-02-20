"use client";

import ImagePreview from "@/components/common/ImagePreview";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type TProps = {
  data: any;
};

const getUser = async (id: string) => {
  try {
    const res = await fetch("/api/user/" + id);
    const data = await res.json();
    if (data.user) {
      return data.user;
    }
  } catch (error) {
    console.log(error);
  }
};



export default function HeroPackage (props: TProps) {
  const { image, name, description, userId, customItem, _id } = props.data;

  const [organizer, setOrganizer] = useState<any>();

  useEffect(() => {
    getUser(userId).then((res) => setOrganizer(res));
  }, []);

  const { data: session } = useSession();
  const user: IUserSession = session?.user ?? {};

  const ButtonOrder = () => {
    if (user.role == "klien"){
      return (
        <Link
          href={"/make-order/" + _id}
          className="btn btn-primary btn-outline justify-self-end"
        >
          Order Now
        </Link>
      );
    } if (user.role === "admin" || user.role == "organizer") {
      return (
        <Link
        href={"/dashboard/package"}
        className="btn btn-primary btn-outline justify-self-end"
       >
          Edit Package
        </Link>
      );
    } else {
      return (
        <Link href="/login">
          <button
            type="button"
            className="btn btn-primary btn-outline justify-self-end"
          >
            Login Here
          </button>
        </Link>
      );
    }
  }
  
  return (
    <div className="flex gap-10 justify-between">
      <div className="w-full flex flex-col">
        <h3 className="text-4xl font-bold mb-3">{name}</h3>
        <h3 className="font-semibold mb-3">Organizer: {organizer?.name}</h3>
        <p className="text-sm">{description}</p>
        <div className="text-sm mt-3 flex">
          <h3>Additional:&nbsp;</h3>
          {customItem.map((item: any, index: number) => {
            if (index == customItem.length - 1) return item.name;
            return item.name + ",";
          })}
        </div>
        <h3 className="text-sm mb-3">
          {"(You can make a request for additional)"}
        </h3>
        <ButtonOrder/>
      </div>
      <ImagePreview
        source={image}
        common
        style={{
          width: "450px",
          height: "350px",
          objectFit: "cover",
          objectPosition: "50% 100%",
          borderRadius: "16px",
        }}
      />
    </div>
  );
};