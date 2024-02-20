import CardReq from "@/components/ui/card";
import React from "react";

type TProps = {
  data: any;
};

export default function CardPack(props: TProps) {
  return (
      <div className="flex flex-wrap justify-center px-2 gap-2 h-max">
        {props.data.map((value: any) => (
          <div key={value._id} className="h-[315px]">
            <CardReq data={value} />
          </div>
        ))}
      </div>
  );
}
