import Link from "next/link";
import ImagePreviewSwiper from "../common/ImagePreviewSwiper";

type TProps = {
  data?: any;
};

export default function SwiperCard(props: TProps) {
  return (
    <div className="max-w-sm h-[365px] rounded overflow-hidden items-center justify-center">
      <div
        className="card w-[350px] bg-third cursor-pointer hover:bg-fourth hover:text-second hover:rounded-2xl"
      >
        <ImagePreviewSwiper source={props.data?.image} />
        <div className="card-body -mt-4 items-center text-center text-second">
          <h3 className="card-title">{props.data?.name}</h3>
          <p className="text-xs text-gray-400 line-clamp-1">
            {props.data?.description}
          </p>
          <div className="card-actions">
          <Link
          href={"/package/" + props.data?._id}
          >
            <button className="btn text-second btn-primary mt-2 hover:bg-second hover:text-primary">
              Order Now
            </button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
