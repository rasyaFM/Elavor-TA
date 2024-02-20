import connectMongoDB from "@/lib/mongodb";
import Order from "@/models/order";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(
  request: NextApiRequest,
  { params }: { params: { id: string } },
  response: NextApiResponse
) {
  const { id } = params;
  try {
    await connectMongoDB();
    const result = await Order.findOne({ _id: id });
    if (result) {
      return Response.json({ orderDatas: result });
    }
    return Response.json("Data Not Found", {
      status: 400,
    });
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
