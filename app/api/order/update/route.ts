import connectMongoDB from "@/lib/mongodb";
import Order from "@/models/order";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const {
      orderId,
      profile,
      packages,
      time,
      totalPrice,
      organizerId,
      customItem,
      status,
      transaction,
    } = await request.json();

    await connectMongoDB();

    const data = await Order.findByIdAndUpdate(orderId, {
      profile,
      package: packages,
      organizerId,
      time,
      status,
      totalPrice,
      transaction,
      customItem,
    });

    return Response.json(
      { message: "Success update order", data },
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
