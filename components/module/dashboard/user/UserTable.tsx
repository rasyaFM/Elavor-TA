"use client";

import Table from "@/components/common/Table";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";

const getData = async (params?: IQuery) => {
  try {
    const res = await fetch("/api/user", {
      headers: { Authorization: "Bearer adskahkdajsnkas" },
    });
    const data = await res.json();
    if (data.userDatas) {
      console.log(data);
      return data.userDatas;
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (_id: string) => {
  try {
    const res = await fetch("/api/user", {
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

const UserTable = () => {
  const [datas, setDatas] = useState<IResponse>();
  const [editData, setEditData] = useState<IUserResponse>();

  useEffect(() => {
    getData().then((res) => setDatas(res));
  }, []);

  const tableColumn: TColumn[] = [
    {
      header: "Name",
      field: "name",
    },
    {
      header: "Email",
      field: "email",
    },
    {
      header: "Role",
      field: "role",
    },
  ];

  const onDelete = async (value: IUserResponse) => {
    await deleteData(value._id);
    getData().then((res) => setDatas(res));
  };

  useEffect(() => {
    (
      document?.getElementById("edit_user_modal") as HTMLDialogElement
    )?.showModal();
  }, [editData, setEditData]);

  const onEdit = (value: IUserResponse) => {
    setEditData(value);
  };

  return (
    <div>
      <div className="flex justify-between items-center my-5">
        <h5 className="text-center">Tabel User</h5>
        <div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() =>
              (
                document?.getElementById("add_user_modal") as HTMLDialogElement
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
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <AddUserModal success={() => getData().then((res) => setDatas(res))} />
      {editData && (
        <EditUserModal
          success={() => getData().then((res) => setDatas(res))}
          data={editData}
        />
      )}
    </div>
  );
};

export default UserTable;
