import Image from "next/image";
import React from "react";
type TProps = {
  source: string;
  common?: boolean;
  style?: Object;
};

const ImagePreview = (props: TProps) => {
  const { source, common } = props;
  if (common) {
    return (
      <Image
        src={source ? "/uploads/" + source : "/no-image.png"}
        width={0}
        height={0}
        sizes="100vw"
        style={props.style}
        alt="image"
      />
    );
  }
  return (
    <Image
      src={source ? "/uploads/" + source : "/no-image.png"}
      width={0}
      height={0}
      objectFit="cover"
      sizes="100%"
      style={{ width: "250px", height: "150px", borderRadius: "16px 16px 0 0" }}
      alt="image"
    />
  );
};

export default ImagePreview;
