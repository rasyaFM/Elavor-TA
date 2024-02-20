"use client";

import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import AddPackageModal from "./AddPackageModal";
import { useSession } from "next-auth/react";
import Table from "@/components/common/Table";
import { rupiah } from "@/lib/utils";
import EditPackageModal from "./EditPackageModal";

const getData = async (id?: string) => {
  try {
    const res = await fetch(id ? "/api/package?id=" + id : "/api/package");
    const data = await res.json();
    if (data.packageDatas) {
      return data.packageDatas;
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (_id: string) => {
  try {
    const res = await fetch("/api/package", {
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

const PackageTable = () => {
  const { data: session } = useSession();
  const [datas, setDatas] = useState<IResponse>();
  const [editData, setEditData] = useState();

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
      header: "Name",
      field: "name",
    },
    {
      header: "Price",
      field: "price",
      bodyTemplate: (data) => rupiah(data.price),
    },
    {
      header: "Category",
      field: "category.name",
      bodyTemplate: (data) => data.category.name,
    },
  ];

  useEffect(() => {
    (
      document?.getElementById("edit_package_modal") as HTMLDialogElement
    )?.showModal();
  }, [editData, setEditData]);

  const handleEdit = (data: any) => {
    setEditData(data);
  };

  const handleDelete = async (data: any) => {
    await deleteData(data._id);
    getData(user.id).then((res) => setDatas(res));
  };

  return (
    <div className="my-5">
      <div className="flex justify-between items-center my-2">
        <h5 className="text-center">Tabel Package</h5>
        <div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() =>
              (
                document?.getElementById(
                  "add_package_modal"
                ) as HTMLDialogElement
              )?.showModal()
            }
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
      <AddPackageModal
        userId={session?.user?.id ?? ""}
        success={() => getData(user.id).then((res) => setDatas(res))}
      />
      {editData && (
        <EditPackageModal
          userId={session?.user?.id ?? ""}
          data={editData}
          success={() => getData(user.id).then((res) => setDatas(res))}
        />
      )}
    </div>
  );
};

export default PackageTable;
