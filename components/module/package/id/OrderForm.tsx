import ImagePreview from "@/components/common/ImagePreview";
import { rupiah } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type TProps = {
  data: any;
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

const OrderForm = (props: TProps) => {
  const session = useSession();
  const router = useRouter();

  let { image, name, userId, customItem, price } = props.data;

  const [date, setDate] = useState();
  const [items, setItems] = useState(customItem);
  const [cusItem, setCusItem] = useState<any[]>([]);

  const [reqItem, setReqItem] = useState({ name: "", price: "" });

  const [organizer, setOrganizer] = useState<any>();
  const [userProfile, setUserProfile] = useState<any>();
  const [profileForm, setProfileForm] = useState({
    address: "",
    phone: "",
    postalCode: "",
    city: "",
    country: "",
  });

  const [numberOfPayment, setNumberOfPayment] = useState(1);

  useEffect(() => {
    getUser(userId).then((res) => setOrganizer(res));
    if (session.data) {
      getUser(session.data?.user?.id ?? "").then((res) => setUserProfile(res));
    }
  }, []);

  const createOrder = async () => {
    if (
      !profileForm.address ||
      !profileForm.phone ||
      !profileForm.postalCode ||
      !profileForm.city ||
      !profileForm.country ||
      !date
    ) {
      return alert("All field required");
    }
    const profile = {
      id: userProfile._id,
      name: userProfile.name,
      email: userProfile.email,
      ...profileForm,
    };
    const totalPrice =
      price +
      cusItem
        .map((item: any) => item.price)
        .reduce((partialSum, a) => partialSum + a, 0);

    const packages = {
      id: props.data._id,
      name: props.data.name,
      price: props.data.price,
      category: props.data.category.name,
      organizerId: props.data.userId,
      image: props.data.image,
    };

    const data = {
      profile,
      packages,
      time: date,
      totalPrice,
      organizerId: organizer._id,
      customItem: cusItem,
      numberOfPayment,
    };
    const postOrder = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (postOrder.ok) {
      const json = await postOrder.json();
      console.log(json);
      const orderId = json.data._id;
      router.push(`/order/${orderId}`);
    } else {
      const json = await postOrder.json();
      alert(json.message);
    }
  };

  return (
    <div className="overflow-x-hidden">
      <h3 className="text-center font-bold text-2xl">Order Form</h3>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 w-[50%]">
          <h3 className="text-xl text-center font-semibold">Package Details</h3>
          <div className="flex gap-3">
            <ImagePreview
              source={image}
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
              <h3 className="text-lg font-bold ">{name}</h3>
              <h3 className="text-md font-semibold">
                Organizer: {organizer?.name}
              </h3>
              <h3 className="text-md font-semibold">
                Base Price: {rupiah(price)}
              </h3>
            </div>
          </div>
          <div className="flex gap-3">
            <h3 className="text-md font-semibold">Booking for date :</h3>
            <Flatpickr
              options={{
                minDate: new Date(),
                mode: "single",
              }}
              value={date}
              onChange={(date: any) => {
                setDate(date);
              }}
              placeholder="Select Date"
              style={{
                border: "1px solid ",
                paddingLeft: "5px",
                borderRadius: "5px",
                maxWidth: "110px",
              }}
            />
          </div>
          <div className="flex flex-col">
            {items.length > 0 && (
              <h3 className="text-md font-semibold">Optional Custom Item :</h3>
            )}
            <div className="flex flex-col justify-between w-[80%]">
              {items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex gap-3 items-center justify-between"
                >
                  <h3>{item.name}</h3>
                  <h3>{rupiah(item.price)}</h3>
                  <PlusCircle
                    size={18}
                    className="hover:cursor-pointer"
                    onClick={() => {
                      setCusItem((prev: any) => {
                        if (prev.length) {
                          return [...prev, item];
                        }
                        return [item];
                      });
                      setItems((prev: any) =>
                        prev.filter((i: any) => i.id != item.id)
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-md font-semibold">Request Custom Item :</h3>
            <div className="flex justify-between w-full items-center mr-5">
              <div className="flex flex-col w-[40%]">
                <input
                  id="nameCus"
                  type="text"
                  className="input input-sm input-bordered"
                  placeholder="Name"
                  value={reqItem.name}
                  onChange={(e) =>
                    setReqItem((prev: any) => {
                      return { ...prev, name: e.target.value };
                    })
                  }
                />
              </div>
              <div className="flex flex-col w-[40%]">
                <input
                  id="priceCus"
                  type="text"
                  className="input input-sm input-bordered"
                  placeholder="Price"
                  value={reqItem.price}
                  onChange={(e) =>
                    setReqItem((prev: any) => {
                      return { ...prev, price: Number(e.target.value) };
                    })
                  }
                />
              </div>
              <PlusCircle
                size={20}
                className="hover:cursor-pointer mr-10"
                onClick={() => {
                  if (reqItem.name && reqItem.price) {
                    setCusItem((prev: any) => {
                      if (prev.length) {
                        return [
                          ...prev,
                          {
                            id: prev.length + 1,
                            name: reqItem.name,
                            price: reqItem.price,
                            request: true,
                          },
                        ];
                      }
                      return [
                        {
                          id: 99,
                          name: reqItem.name,
                          price: reqItem.price,
                          request: true,
                        },
                      ];
                    });
                    setReqItem({ name: "", price: "" });
                  }
                }}
              />
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-md font-semibold">Total Price :</h3>
            <div className="flex flex-col mx-5 mr-14">
              <div className="flex w-full justify-between">
                <h3 className="text-md">Base Price:</h3>
                <h3 className="text-md font-semibold">{rupiah(price)}</h3>
              </div>
              {cusItem.length > 0 && (
                <div className="flex w-full justify-between">
                  <h3 className="text-md">Additional :</h3>
                </div>
              )}
              {cusItem.length > 0 &&
                cusItem.map((item: any) => (
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
                  {rupiah(
                    price +
                      cusItem
                        .map((item: any) => item.price)
                        .reduce((partialSum, a) => partialSum + a, 0)
                  )}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <h3 className="text-xl text-center font-semibold">Profile Details</h3>
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                className="input input-sm input-bordered"
                value={profileForm.address}
                onChange={(e) =>
                  setProfileForm((prev) => {
                    return { ...prev, address: e.target.value };
                  })
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="text"
                className="input input-sm input-bordered"
                value={profileForm.phone}
                onChange={(e) =>
                  setProfileForm((prev) => {
                    return { ...prev, phone: e.target.value };
                  })
                }
              />
            </div>
            <div className="flex justify-between gap-5">
              <div className="flex flex-col w-full">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  id="postalCode"
                  type="text"
                  className="input input-sm input-bordered"
                  value={profileForm.postalCode}
                  onChange={(e) =>
                    setProfileForm((prev) => {
                      return { ...prev, postalCode: e.target.value };
                    })
                  }
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  className="input input-sm input-bordered"
                  value={profileForm.city}
                  onChange={(e) =>
                    setProfileForm((prev) => {
                      return { ...prev, city: e.target.value };
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                type="text"
                className="input input-sm input-bordered"
                value={profileForm.country}
                onChange={(e) =>
                  setProfileForm((prev) => {
                    return { ...prev, country: e.target.value };
                  })
                }
              />
            </div>
          </div>
          <div className="flex items-center w-full gap-2 mt-5">
            <h3>Choose the number of payments</h3>
            <select
              value={numberOfPayment}
              onChange={(e) => setNumberOfPayment(Number(e.target.value))}
              className="select select-sm select-bordered"
            >
              <option selected value={1}>
                1x
              </option>
              <option value={2}>2x</option>
              <option value={3}>3x</option>
            </select>
          </div>
          <div className="flex items-center w-full gap-2 mt-5 m">
            <button
              onClick={() => createOrder()}
              className="btn btn-primary btn-outline"
            >
              Create Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
