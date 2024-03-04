"use client";

import EditProfileModal from "@/components/module/profile/EditProfileModal";
import SectionHeaders from "@/components/sectionHeaders";
import { rupiah } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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

const getOrder = async (id: string) => {
  try {
    const res = await fetch("/api/order/user/" + id);
    const data = await res.json();
    if (data.orderDatas) {
      console.log(data.orderDatas);
      return data.orderDatas;
    }
  } catch (error) {
    console.log(error);
  }
};

const Page = () => {
  const session = useSession();

  const [user, setUser] = useState<any>();
  const [order, setOrder] = useState<any>();
  const [userProfile, setUserProfile] = useState<any>();

  const userSafe: IUserSession = session?.data?.user ?? {};

  useEffect(() => {
    getUser(session.data?.user?.id ?? "").then((res) => setUserProfile(res));
    getOrder(session.data?.user?.id ?? "").then((res) => setOrder(res));
  }, []);

  return (
    <section className="mt-5 px-5 profile gap-5">
      <div className="mb-10">
        <div className="mt-2">
          <SectionHeaders mainHeader={"Profile"} subHeader={""} />
        </div>
        <div className="w-max">
          <form className="grid grid-rows my-5 w-[500px]">
            <label typeof="Person" className="mb-2">
              Full Name
            </label>
            <h3 className="mb-2">{userProfile?.name}</h3>
            <label typeof="Email" className="mb-2">
              Email
            </label>
            <h3 className="mb-2 italic">{userProfile?.email}</h3>
            <label typeof="Phone" className="mb-2">
              Phone Number
            </label>
            <h3 className="mb-2">{userProfile?.phone}</h3>
            <label typeof="Address" className="mb-2">
              Address
            </label>
            <h3 className="mb-2">{userProfile?.address}</h3>
          </form>
          <button
            type="button"
            className="btn btn-primary btn-outline justify-self-end"
            onClick={() =>
              (
                document?.getElementById("edit_user_modal") as HTMLDialogElement
              )?.showModal()
            }
          >
            Edit Profile
          </button>
        </div>
      </div>
      {userSafe.role == "klien" && (
        <>
          <div className="bg-primary"></div>
          <div className="text-right max-w ">
            <div className="mt-2 w-[500px]">
              <SectionHeaders mainHeader={"Order"} subHeader={""} />
            </div>
            <div className="w-max">
              <form className="grid grid-rows my-5 w-[500px]">
                <label typeof="Person" className="mb-2">
                  Package Name
                </label>
                <h3 className="mb-2">{order?.package?.name}</h3>
                <div>
                  <label typeof="Total" className="mb-2">
                    Total
                  </label>
                  <h3 className="mb-2">{rupiah(order?.totalPrice)}</h3>
                </div>
                <div>
                  <label typeof="Date" className="mb-2">
                    Date
                  </label>

                  <h3 className="mb-2">
                    {new Date(order?.time).toLocaleDateString()}
                  </h3>
                </div>
                <label typeof="Status" className="mb-2">
                  Status
                </label>
                <div className="w-full flex justify-end">
                  <h3
                    className={
                      order?.status == "Decline"
                        ? "badge badge-error text-white text-md font-semibold my-auto"
                        : order?.status == "Requested"
                        ? "badge badge-warning text-white text-md font-semibold my-auto"
                        : "badge badge-success text-white text-md font-semibold my-auto"
                    }
                  >
                    {order?.status}
                  </h3>
                </div>
                <div className="flex justify-end my-3">
                  <Link
                    href={"/order/" + order?._id}
                    className="btn btn-outline btn-primary w-fit"
                  >
                    Order Details
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      {userProfile && (
        <EditProfileModal
          data={userProfile}
          success={() =>
            getUser(session.data?.user?.id ?? "").then((res) =>
              setUserProfile(res)
            )
          }
        />
      )}
    </section>
  );
};

export default Page;
