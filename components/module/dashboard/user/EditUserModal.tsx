"use client";

import { ChevronDown, ChevronUp, X } from "lucide-react";
import React, { FormEvent, useState } from "react";

type TProps = {
  success: () => void;
  data?: IUserResponse;
};

const EditUserModal = (props: TProps) => {
  const [id, setId] = useState(props?.data?._id);
  const [email, setEmail] = useState(props?.data?.email);
  const [name, setName] = useState(props?.data?.name);
  const [password, setPassword] = useState(props?.data?.password);
  const [newPassword, setNewPassword] = useState("");
  const [role, setRole] = useState(props?.data?.role);
  const [address, setAddress] = useState(props?.data?.address);
  const [phone, setPhone] = useState(props?.data?.phone);

  const [optional, setOptional] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);

  async function handleFormSubmit(ev: FormEvent) {
    ev.preventDefault();
    setCreatingUser(true);

    const data = optional
      ? JSON.stringify({
          _id: id,
          email,
          name,
          password: newPassword.length ? newPassword : undefined,
          role,
          address,
          phone,
        })
      : JSON.stringify({
          _id: id,
          email,
          name,
          password: newPassword.length ? newPassword : undefined,
          role,
        });

    const response = await fetch("/api/register", {
      method: "PUT",
      body: data,
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setCreatingUser(false);
      props.success();
      closeModal();
    } else {
      const json = await response.json();
      setCreatingUser(false);
      alert(json.message);
    }
  }

  const closeModal = () => {
    (document?.getElementById("edit_user_modal") as HTMLDialogElement)?.close();
  };
  return (
    <dialog className="modal" id="edit_user_modal">
      <div className="modal-box h-[80vh]">
        <div className="flex justify-end">
          <button
            className="btn btn-circle btn-ghost h-8 min-h-8 w-8"
            onClick={() => closeModal()}
          >
            <X size={18} />
          </button>
        </div>
        <h5 className="text-center mb-4 mt-[-15px] font-medium text-xl text-primary">
          Edit User Data
        </h5>
        <form
          className="block max-w-xs mx-auto"
          onSubmit={handleFormSubmit}
          method="dialog"
        >
          <input
            className="input input-bordered input-md w-full mt-2 hover:border-fourth"
            type="name"
            placeholder="name"
            value={name}
            disabled={creatingUser}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            className="input input-bordered input-md w-full mt-2 disabled bg-slate-300"
            type="emailUser"
            placeholder="email"
            value={email}
          />
          <input
            className="input input-bordered input-md w-full mt-2 hover:border-fourth"
            type="password"
            placeholder="password"
            value={newPassword}
            disabled={creatingUser}
            onChange={(ev) => setNewPassword(ev.target.value)}
          />
          <input
            className="input input-bordered input-md w-full mt-2 disabled bg-slate-300"
            type="role"
            placeholder="role"
            value={role}
            disabled={creatingUser}
          />
          <button
            type="button"
            className="w-fit p-0 border-0 mx-auto"
            onClick={() => setOptional((prev) => !prev)}
          >
            <div className="flex items-center gap-1 font-medium text-sm mt-3">
              optional{" "}
              {optional ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </div>
          </button>
          {optional && (
            <div className="mt-2">
              <input
                className="input input-bordered input-md w-full mt-2 hover:border-fourth"
                type="address"
                placeholder="address"
                value={address}
                disabled={creatingUser}
                onChange={(ev) => setAddress(ev.target.value)}
              />
              <input
                className="input input-bordered input-md w-full mt-2 hover:border-fourth"
                type="phone"
                placeholder="phone"
                value={phone}
                disabled={creatingUser}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
          )}

          <div className="modal-action">
            <button
              className="hover:bg-fourth hover:text-second"
              type="submit"
              disabled={creatingUser}
            >
              Edit Data
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditUserModal;
