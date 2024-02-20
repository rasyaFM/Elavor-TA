import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(
  request: NextApiRequest,
  { params }: { params: { id: string } },
  response: NextApiResponse
) {
  const { id } = params;
  try {
    await connectMongoDB();
    const result = await User.findOne({ _id: id });
    if (result) {
      return Response.json({ user: result });
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
