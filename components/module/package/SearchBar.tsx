"use client";
import React, { useEffect, useState } from "react";

type TProps = {
  onSearch: (value: string) => void;
};

export default function SearchBar(props: Readonly<TProps>) {
  const [input, setInput] = useState("");

  useEffect(() => {
    props.onSearch(input);
  }, [input, setInput]);

  return (
    <div className="w-[500px] overflow-hidden">
      <input
        className="rounded-2xl"
        type="search"
        name="searhbar"
        placeholder="search any package"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}
