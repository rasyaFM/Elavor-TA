"use client";

import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Table from "@/components/common/Table";
import { rupiah } from "@/lib/utils";
import { useRouter } from "next/navigation";

const getData = async (id?: string) => {
  try {
    const res = await fetch(id ? "/api/order?id=" + id : "/api/order");
    const data = await res.json();
    if (data.orderDatas) {
      return data.orderDatas;
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (_id: string) => {
  try {
    const res = await fetch("/api/order", {
      method: "DELETE",
      body: JSON.stringify({ _id }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data) {
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const OrderTable = () => {
  const { data: session } = useSession();
  const [datas, setDatas] = useState<IResponse>();

  const router = useRouter();

  const user: IUserSession = session?.user ?? {};

  useEffect(() => {
    if (user.role == "admin") {
      getData().then((res) => setDatas(res));
    } else {
      getData(user.id).then((res) => setDatas(res));
    }
  }, []);

  const tableColumn: TColumn[] = [
    {
      header: "Package Name",
      field: "name",
      bodyTemplate: (data) => data.package.name,
    },
    {
      header: "Price",
      field: "totalPrice",
      bodyTemplate: (data) => rupiah(data.totalPrice),
    },
    {
      header: "Status",
      field: "status",
    },
    {
      header: "Category",
      field: "category",
      bodyTemplate: (data) => data.package.category,
    },
  ];

  const handleEdit = (data: any) => {
    router.push("/order/" + data._id);
  };

  const handleDelete = async (data: any) => {
    await deleteData(data._id);
    getData().then((res) => setDatas(res));
  };

  return (
    <div className="my-5">
      <div className="flex justify-between items-center my-2">
        <h5 className="text-center">Tabel Order</h5>
        <div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => router.push("/package")}
          >
            <PlusCircle size={14} />
            Tambah
          </button>
        </div>
      </div>
      <Table
        column={tableColumn}
        datas={datas ?? []}
        keys="_id"
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default OrderTable;
