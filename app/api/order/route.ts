import connectMongoDB from "@/lib/mongodb";
import Order from "@/models/order";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      profile,
      packages,
      time,
      totalPrice,
      organizerId,
      customItem,
      numberOfPayment,
    } = await request.json();

    if (
      !profile ||
      !packages ||
      !time ||
      !totalPrice ||
      !numberOfPayment ||
      !organizerId
    ) {
      return Response.json(
        { message: "all field are required" },
        { status: 400 }
      );
    }

    const price = totalPrice / numberOfPayment;
    const transaction: ITransaction[] = [];
    for (let i = 0; i < numberOfPayment; i++) {
      const tr: ITransaction = {
        id: i + 1,
        price,
        status: "Unpaid",
      };
      transaction.push(tr);
    }

    await connectMongoDB();

    const data = await Order.create({
      profile,
      package: packages,
      organizerId,
      time,
      status: "Requested",
      totalPrice,
      transaction,
      customItem,
    });
    return Response.json(
      { message: "Success created new order", data },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { message: "Error", error: error.message },
        { status: 500 }
      );
    }
    return Response.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const idOrganizer = searchParams.get("id") as string;
  if (!idOrganizer) {
    try {
      const page = parseInt(searchParams.get("page") as string);
      const limit = parseInt(searchParams.get("limit") as string);
      await connectMongoDB();

      if (page && limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const totalRecords = await Order.countDocuments();
        let next = undefined;
        if (endIndex < totalRecords) {
          next = {
            page: page + 1,
            limit: limit,
          };
        }
        let previous = undefined;
        if (startIndex > 0 && startIndex <= totalRecords) {
          previous = {
            page: page - 1,
            limit: limit,
          };
        }

        const allUser = await Order.find().limit(limit).skip(startIndex);
        return Response.json({
          next,
          previous,
          totalRecords,
          userDatas: allUser,
        });
      } else {
        const allUser = await Order.find();
        return Response.json({ orderDatas: allUser });
      }
    } catch (error) {
      return new Response("401 Unauthorized", {
        status: 401,
      });
    }
  } else {
    try {
      const page = parseInt(searchParams.get("page") as string);
      const limit = parseInt(searchParams.get("limit") as string);
      await connectMongoDB();

      if (page && limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const totalRecords = await Order.countDocuments();
        let next = undefined;
        if (endIndex < totalRecords) {
          next = {
            page: page + 1,
            limit: limit,
          };
        }
        let previous = undefined;
        if (startIndex > 0 && startIndex <= totalRecords) {
          previous = {
            page: page - 1,
            limit: limit,
          };
        }

        const allUser = await Order.find({ organizerId: idOrganizer })
          .limit(limit)
          .skip(startIndex);
        return Response.json({
          next,
          previous,
          totalRecords,
          userDatas: allUser,
        });
      } else {
        const allUser = await Order.find({ organizerId: idOrganizer });
        return Response.json({ orderDatas: allUser });
      }
    } catch (error) {
      return new Response("401 Unauthorized", {
        status: 401,
      });
    }
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { _id } = await request.json();
    if (!_id)
      return Response.json({ message: "_id required" }, { status: 400 });
    await connectMongoDB();
    const status = await Order.deleteOne({ _id });
    return Response.json(
      { message: "Success delete order", status },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { message: "Error", error: error.message },
        { status: 500 }
      );
    }
    return Response.json({ message: "Error", error }, { status: 500 });
  }
}
