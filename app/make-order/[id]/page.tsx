"use client";

import OrderForm from "@/components/module/package/id/OrderForm";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const getData = async (id: string) => {
  try {
    const res = await fetch("/api/package/" + id);
    const data = await res.json();
    if (data.packageDatas) {
      return data.packageDatas;
    }
  } catch (error) {
    console.log(error);
  }
};

const Page = () => {
  const path = usePathname();
  const id = path.split("/")[2];
  const [datas, setDatas] = useState();

  useEffect(() => {
    getData(id).then((res) => setDatas(res));
  }, []);

  return <div className="mx-20">{datas && <OrderForm data={datas} />}</div>;
};

export default Page;
