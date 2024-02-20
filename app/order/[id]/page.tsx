"use client";

import OrderDetails from "@/components/module/order/OrderDetails";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const getData = async (id: string) => {
  try {
    const res = await fetch("/api/order/" + id);
    const data = await res.json();
    if (data.orderDatas) {
      return data.orderDatas;
    }
  } catch (error) {
    console.log(error);
  }
};

const Page = () => {
  const session = useSession();
  const path = usePathname();
  const id = path.split("/")[2];
  const [datas, setDatas] = useState();

  useEffect(() => {
    getData(id).then((res) => setDatas(res));
  }, []);

  return (
    <div className="mx-20">
      {datas && <OrderDetails userInfo={session.data?.user} data={datas} />}
    </div>
  );
};

export default Page;
