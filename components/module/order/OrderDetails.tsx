import ImagePreview from "@/components/common/ImagePreview";
import { rupiah } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { CircleDollarSign } from "lucide-react";
import { useSession } from "next-auth/react";

type TProps = {
  data: any;
  userInfo: any;
};

const getUser = async (id: string) => {
  try {
    const res = await fetch("/api/user/" + id);
    const data = await res.json();
    if (data.user) {
      return data.user;
    }
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (data: any) => {
  try {
    const res = await fetch("/api/order/update", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    const datas = await res.json();
    if (datas.data) {
      alert("success update data");
      return datas.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const OrderForm = (props: TProps) => {
  const session = useSession();

  const [valStatus, setValStatus] = useState(props.data.status);
  const [organizer, setOrganizer] = useState<any>();
  const [userProfile, setUserProfile] = useState<any>();

  useEffect(() => {
    getUser(props.data.organizerId).then((res) => setOrganizer(res));
    if (session.data) {
      getUser(session.data?.user?.id ?? "").then((res) => setUserProfile(res));
    }

    const url = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.CLIENT_MIDTRANS ?? "";

    const script = document.createElement("script");
    script.src = url;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const checkout = async (datas: any) => {
    const data = {
      orderId: props.data._id,
      totalPrice: datas.price,
      profile: props.data.profile,
      packages: props.data.package,
      transactionId: datas.id,
    };
    const res = await fetch("/api/tokenizer", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    (window as any).snap.pay(resData.result.token);
  };

  const statusDom = () => {
    if (props.userInfo.role == "klien") {
      return (
        <h3
          className={
            props.data.status == "Decline"
              ? "badge badge-error text-white text-md font-semibold my-auto"
              : props.data.status == "Requested"
              ? "badge badge-warning text-white text-md font-semibold my-auto"
              : "badge badge-success text-white text-md font-semibold my-auto"
          }
        >
          {props.data.status}
        </h3>
      );
    } else {
      return (
        <select
          className="select select-bordered  mt-2 mr-"
          value={valStatus}
          onChange={(e) => setValStatus(e.target.value)}
        >
          <option>Requested</option>
          <option>Waiting for Payment</option>
          <option>Accept</option>
          <option>Done</option>
          <option>Decline</option>
        </select>
      );
    }
  };

  return (
    <div className="overflow-x-hidden">
      <h3 className="text-center font-bold text-2xl mb-5">ORDER DETAIL</h3>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 w-[50%]">
          <div className="flex gap-3">
            <ImagePreview
              source={props.data.package.image}
              common
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                objectPosition: "50% 100%",
                borderRadius: "16px",
              }}
            />
            <div className="w-fit flex flex-col justify-center">
              <h3 className="text-lg font-bold ">{props.data.package.name}</h3>
              <h3 className="text-md font-semibold">
                Organizer: {organizer?.name}
              </h3>
              <h3 className="text-md font-semibold">
                Base Price: {rupiah(props.data.package.price)}
              </h3>
            </div>
          </div>
          <div className="flex gap-3">
            <h3 className="text-md font-semibold">Booking for date :</h3>
            <h3 className="text-md font-semibold">
              {new Date(props.data.time).toLocaleDateString()}
            </h3>
          </div>
          <div className="w-full">
            <h3 className="text-md font-semibold">Total Price :</h3>
            <div className="flex flex-col mx-5 mr-14">
              <div className="flex w-full justify-between">
                <h3 className="text-md">Base Price:</h3>
                <h3 className="text-md font-semibold">
                  {rupiah(props.data.package.price)}
                </h3>
              </div>
              {props.data.customItem.length > 0 && (
                <div className="flex w-full justify-between">
                  <h3 className="text-md">Additional :</h3>
                </div>
              )}
              {props.data.customItem.length > 0 &&
                props.data.customItem.map((item: any) => (
                  <div key={item.id} className="flex w-full justify-between">
                    <h3 className="text-md ml-3">{item.name}:</h3>
                    <h3 className="text-md font-semibold">
                      {rupiah(item.price)}
                    </h3>
                  </div>
                ))}
              <div className="flex w-full justify-between border-t-2">
                <h3 className="text-md">Total Price:</h3>
                <h3 className="text-md font-semibold">
                  {rupiah(props.data.totalPrice)}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex items-center w-full gap-2 mt-5">
            <h3>Number of Payments :</h3>
            <h3 className="text-md font-semibold">
              {props.data.transaction.length}
            </h3>
          </div>
          <div className="flex flex-col w-full gap-2">
            <h3>Transaction :</h3>
            <table className="table table-sm border border-1">
              <thead>
                <tr>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Date</th>
                  {props.userInfo.role == "klien" && (
                    <th>
                      <h3 className="text-center">Payment</h3>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {props.data.transaction.map((data: any) => (
                  <tr key={data.id}>
                    <td>{rupiah(data.price)}</td>
                    <td>
                      <div
                        className={
                          data.status == "Paid"
                            ? "badge badge-success text-white font-semibold my-auto"
                            : "badge badge-warning text-white font-semibold my-auto"
                        }
                      >
                        {data.status}
                      </div>
                    </td>
                    <td>
                      {data.paymentTime
                        ? new Date(data.paymentTime).toLocaleString()
                        : "-"}
                    </td>
                    {props.userInfo.role == "klien" && (
                      <td>
                        {data.status != "Paid" ? (
                          <CircleDollarSign
                            color="green"
                            className="hover:cursor-pointer mx-auto"
                            onClick={() => {
                              checkout({ price: data.price, id: data.id });
                            }}
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between gap-5">
              <div className="flex flex-col w-full">
                <label htmlFor="postalCode">Order Id</label>
                <h3 className="text-md font-semibold">{props.data._id}</h3>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="city">Status</label>
                {statusDom()}
              </div>
            </div>
            <div className="flex justify-between gap-5">
              <div className="flex flex-col w-full">
                <label htmlFor="postalCode">Name</label>
                <h3 className="text-md font-semibold">
                  {props.data.profile.name}
                </h3>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="city">Email</label>
                <h3 className="text-md font-semibold">
                  {props.data.profile.email}
                </h3>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="address">Address</label>
              <h3 className="text-md font-semibold">
                {props.data.profile.address}
              </h3>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="phone">Phone</label>
              <h3 className="text-md font-semibold">
                {props.data.profile.phone}
              </h3>
            </div>
            <div className="flex justify-between gap-5">
              <div className="flex flex-col w-full">
                <label htmlFor="postalCode">Postal Code</label>
                <h3 className="text-md font-semibold">
                  {props.data.profile.postalCode}
                </h3>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="city">City</label>
                <h3 className="text-md font-semibold">
                  {props.data.profile.city}
                </h3>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="country">Country</label>
              <h3 className="text-md font-semibold">
                {props.data.profile.country}
              </h3>
            </div>
          </div>
          {props.userInfo.role != "klien" && (
            <button
              onClick={() =>
                updateOrder({ orderId: props.data._id, status: valStatus })
              }
              className="btn btn-primary btn-outline w-fit mx-auto"
            >
              Update Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
