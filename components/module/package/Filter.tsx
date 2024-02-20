"use client";

import { AlignJustify } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

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

type TProps = {
  onChange: (value: string) => void;
};

export default function FilterPack(props: Readonly<TProps>) {
  const [category, setCategory] = useState([]);
  const [valCat, setValCat] = useState("");

  useEffect(() => {
    getCategory().then((res) => setCategory(res));
  }, []);

  useEffect(() => {
    props.onChange(valCat);
  }, [valCat, setValCat]);

  return (
    <div className="dropdown dropdown-hover">
      <div className="btn btn-sm bg-second border-0 hover:bg-slate-500 hover:text-second">
        <AlignJustify/> {/* on Click = All Paket */}
      </div>
      {category && (
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-second rounded-box w-52">
          {category.map((res: ICategoryModel) => (
            <li key={res.id}>
              <button
                className="btn btn-sm btn-ghost hover:bg-slate-300"
                onClick={() => setValCat(res.name)}
              >
                {res.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
