"use client";
import { File } from "buffer";
import { X, PlusCircle, UploadCloud } from "lucide-react";
import React, { FormEvent, useEffect, useState } from "react";

type TProps = {
  userId: string;
  success: () => void;
  data: any;
};

const getCategory = async () => {
  try {
    const res = await fetch("/api/category");
    const data = await res.json();
    if (data.category) {
      return data.category;
    }
  } catch (error) {
    console.log(error);
  }
};

const EditPackageModal = (props: TProps) => {
  const [name, setName] = useState(props.data?.name);
  const [price, setPrice] = useState(props.data?.price);
  const [desc, setDesc] = useState(props.data?.description);
  const [category, setCategory] = useState([]);
  const [valCat, setValCat] = useState(props.data?.category.id);
  const [cusItem, setCusItem] = useState<ICostumItem[]>(props.data?.customItem);

  const [image, setImage] = useState<File>();

  const [creatingUser, setCreatingUser] = useState(false);

  useEffect(() => {
    getCategory().then((res) => setCategory(res));
  }, []);

  async function handleFormSubmit(ev: FormEvent) {
    ev.preventDefault();
    setCreatingUser(true);
    let nameFile;

    if (image) {
      const formdata = new FormData();
      const files: any = image;
      formdata.set("file", files);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formdata,
      });
      if (response.ok) {
        const json = await response.json();
        nameFile = json.filename;
      } else {
        const json = await response.json();
        setCreatingUser(false);
        return alert(json.message);
      }
    }

    const datas = {
      name,
      userId: props.userId,
      category: category.filter((value: any) => valCat == value.id)[0],
      price,
      cusItem,
      desc,
      image: nameFile ?? undefined,
      _id: props.data?._id,
    };

    const daftar = await fetch("/api/package", {
      method: "PUT",
      body: JSON.stringify(datas),
      headers: { "Content-Type": "application/json" },
    });
    if (daftar.ok) {
      const json = await daftar.json();
      console.log(json);
      setCreatingUser(false);
      props.success();
      closeModal();
    } else {
      const json = await daftar.json();
      setCreatingUser(false);
      alert(json.message);
    }
  }

  const closeModal = () => {
    (
      document?.getElementById("edit_package_modal") as HTMLDialogElement
    )?.close();
    setName("");
    setPrice("");
    setCusItem([]);
    setValCat("");
    setImage(undefined);
    setDesc("");
  };

  function handleChange(event: any) {
    setImage(event.target.files[0]);
  }
  return (
    <dialog className="modal" id="edit_package_modal">
      <div className="modal-box h-[90vh]">
        <div className="flex justify-end">
          <button
            className="btn btn-circle btn-ghost h-8 min-h-8 w-8"
            onClick={() => closeModal()}
          >
            <X size={18} />
          </button>
        </div>
        <h5 className="text-center mb-4 mt-[-15px] font-medium text-xl ">
          Edit Package
        </h5>
        <form
          className="block max-w-xs mx-auto "
          onSubmit={handleFormSubmit}
          method="dialog"
        >
          <input
            className="input input-bordered input-md w-full mb-2"
            type="text"
            placeholder="Name Package"
            maxLength={17}
            value={name}
            disabled={creatingUser}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            className="input input-bordered input-md w-full"
            type="number"
            placeholder="Price"
            value={price}
            disabled={creatingUser}
            onChange={(ev) => setPrice(ev.target.value)}
          />
          <textarea
            className="input input-bordered input-md pt-2 w-full mt-2 min-h-12"
            placeholder="Description"
            value={desc}
            disabled={creatingUser}
            onChange={(ev) => setDesc(ev.target.value)}
          />
          <div className="flex items-center gap-2">
            <label htmlFor="file" className="btn btn-md btn-outline">
              <UploadCloud size={15} />
              Upload Image
            </label>
            <input
              id="file"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleChange}
            />
            <h3>{image?.name}</h3>
          </div>
          {category && (
            <select
              className="select select-bordered w-full max-w-xs mt-2 text-gray-400"
              value={valCat}
              onChange={(e) => setValCat(e.target.value)}
            >
              <option value="category" disabled hidden>
                Select Category
              </option>
              {category.map((res: ICategoryModel) => (
                <option key={res.id} value={res.id}>
                  {res.name}
                </option>
              ))}
            </select>
          )}
          {cusItem?.map((data) => (
            <div key={data.id} className="mt-2">
              <input
                className="input input-bordered input-md w-[50%]"
                type="text"
                placeholder="Name"
                value={data.name}
                disabled={creatingUser}
                onChange={(ev) =>
                  setCusItem((prev) => {
                    const filtered = prev.filter(
                      (datas) => datas.id !== data.id
                    );
                    const isData = prev.filter((datas) => datas.id == data.id);
                    const value = isData[0];
                    value.name = ev.target.value;
                    return [...filtered, value];
                  })
                }
              />
              <input
                className="input input-bordered input-md w-[50%] mt-2"
                type="number"
                placeholder="Price"
                value={data.price}
                disabled={creatingUser}
                onChange={(ev) =>
                  setCusItem((prev) => {
                    const filtered = prev.filter(
                      (datas) => datas.id !== data.id
                    );
                    const isData = prev.filter((datas) => datas.id == data.id);
                    const value = isData[0];
                    value.price = Number(ev.target.value);
                    return [...filtered, value];
                  })
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="w-fit p-0 border-0 mx-auto mt-2"
            onClick={() =>
              setCusItem((prev) => {
                const data = {
                  id: prev.length + 1,
                  name: "",
                  price: "",
                };
                return [...prev, data];
              })
            }
          >
            <div className="flex items-center gap-1 font-medium text-sm">
              add custom items <PlusCircle size={15} />
            </div>
          </button>

          <div className="modal-action">
            <button
              className="hover:bg-fourth hover:text-second"
              type="submit"
              disabled={creatingUser}
            >
              Update Package
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditPackageModal;
