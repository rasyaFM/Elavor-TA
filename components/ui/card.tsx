import Link from "next/link";
import ImagePreview from "../common/ImagePreview";

type TProps = {
  data?: any;
};

export default function CardReq(props: TProps) {
  return (
    <div className="max-w-sm h-[310px] rounded overflow-hidden">
      <Link
        href={"/package/" + props.data?._id}
        className="card w-[250px] bg-third cursor-pointer hover:bg-fourth hover:text-second hover:rounded-2xl"
      >
        <ImagePreview source={props.data?.image} />
        <div className="card-body -mt-4 items-center text-center text-second">
          <h3 className="card-title">{props.data?.name}</h3>
          <p className="text-xs text-gray-400 line-clamp-1">
            {props.data?.description}
          </p>
          <div className="card-actions">
            <button className="btn text-second btn-primary mt-2 hover:bg-second hover:text-primary">
              Order Now
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
