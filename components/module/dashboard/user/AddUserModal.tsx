"use client";

import { ChevronDown, ChevronUp, X } from "lucide-react";
import React, { FormEvent, useState } from "react";

type TProps = {
  success: () => void;
};

const AddUserModal = (props: TProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("klien");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [optional, setOptional] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  async function handleFormSubmit(ev: FormEvent) {
    ev.preventDefault();
    setCreatingUser(true);

    const data = optional
      ? JSON.stringify({ email, name, password, role, address, phone })
      : JSON.stringify({ email, name, password, role });

    const response = await fetch("/api/register", {
      method: "POST",
      body: data,
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setCreatingUser(false);
      props.success();
      setAddress("");
      setEmail("");
      setName("");
      setPassword("");
      setPhone("");
      setRole("klien");
      closeModal();
    } else {
      const json = await response.json();
      setCreatingUser(false);
      alert(json.message);
    }
  }

  const closeModal = () => {
    (document?.getElementById("add_user_modal") as HTMLDialogElement)?.close();
  };
  return (
    <dialog className="modal" id="add_user_modal">
      <div className="modal-box h-[80vh]">
        <div className="flex justify-end">
          <button
            className="btn btn-circle btn-ghost h-8 min-h-8 w-8"
            onClick={() => closeModal()}
          >
            <X size={18} />
          </button>
        </div>
        <h5 className="text-center mb-4 mt-[-15px] font-medium text-xl text-second">
          Register New User
        </h5>
        <form
          className="block max-w-xs mx-auto"
          onSubmit={handleFormSubmit}
          method="dialog"
        >
          <input
            className="input input-bordered input-md w-full mt-2"
            type="nameUser"
            placeholder="name"
            value={name}
            disabled={creatingUser}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            className="input input-bordered input-md w-full mt-2"
            type="emailUser"
            placeholder="email"
            value={email}
            disabled={creatingUser}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            className="input input-bordered input-md w-full mt-2"
            type="passwordUser"
            placeholder="password"
            value={password}
            disabled={creatingUser}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <div className="dropdown dropdown-hover text-second">
            <div className="flex items-center gap-3">
              <h4 className="mt-1"> Role : </h4>
              <div tabIndex={0} role="button" className="btn btn-xs mt-2">
                {role}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => setRole("klien")}
                >
                  klien
                </button>
              </li>
              <li>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => setRole("organizer")}
                >
                  organizer
                </button>
              </li>
              <li>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => setRole("admin")}
                >
                  admin
                </button>
              </li>
            </ul>
          </div>
          <button
            type="button"
            className="w-fit p-0 border-0 mx-auto"
            onClick={() => setOptional((prev) => !prev)}
          >
            <div className="flex items-center gap-1 font-medium text-sm text-second">
              optional{" "}
              {optional ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </div>
          </button>
          {optional && (
            <div className="mt-3">
              <input
                className="input input-bordered input-md w-full mt-2"
                type="addressUser"
                placeholder="address"
                value={address}
                disabled={creatingUser}
                onChange={(ev) => setAddress(ev.target.value)}
              />
              <input
                className="input input-bordered input-md w-full mt-2"
                type="phoneUser"
                placeholder="phone"
                value={phone}
                disabled={creatingUser}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
          )}

          <div className="modal-action ">
            <button
              className="hover:bg-fourth hover:text-second"
              type="submit"
              disabled={creatingUser}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddUserModal;
