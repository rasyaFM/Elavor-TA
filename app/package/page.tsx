"use client";

import CardPack from "@/components/module/package/CardPack";
import FilterPack from "@/components/module/package/Filter";
import SearchBar from "@/components/module/package/SearchBar";
import React, { useEffect, useState } from "react";

const getData = async () => {
  try {
    const res = await fetch("/api/package");
    const data = await res.json();
    if (data.packageDatas) {
      return data.packageDatas;
    }
  } catch (error) {
    console.log(error);
  }
};

export default function Package() {
  const [datas, setDatas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getData().then((res) => {
      setDatas(res);
      setFiltered(res);
    });
  }, []);

  useEffect(() => {
    setFiltered(
      datas.filter((item: any) => item.name.toLowerCase().includes(input))
    );
  }, [input, setInput]);

  useEffect(() => {
    setFiltered(
      datas.filter((item: any) =>
        item.category.name.toLowerCase().includes(category)
      )
    );
  }, [category, setCategory]);

  return (
    <section>
      <div className="container flex justify-center items-center gap-3 mt-3">
        <SearchBar onSearch={(value) => setInput(value)} />
        <FilterPack onChange={(value) => setCategory(value)} />
      </div>
      <div className="mt-10 mb-[15rem]">
        <CardPack data={filtered} />
      </div>
    </section>
  );
}
