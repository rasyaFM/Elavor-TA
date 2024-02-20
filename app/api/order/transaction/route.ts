import connectMongoDB from "@/lib/mongodb";
import Order from "@/models/order";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const idCombination = searchParams.get("order_id") as string;
  const status = searchParams.get("transaction_status") as string;

  const Id = idCombination.split("_")[0];
  try {
    if (idCombination && status == "settlement") {
      const transactionId = parseInt(idCombination.split("_")[1]);

      await connectMongoDB();

      const orderDetail = await Order.findById(Id);

      if (!orderDetail) {
        return Response.json({ error: "id Not found" });
      }

      const transaction = orderDetail.transaction;

      transaction[transactionId - 1] = {
        ...transaction[transactionId - 1],
        status: "Paid",
        paymentTime: new Date(),
      };

      const putOrder = await Order.findByIdAndUpdate(Id, { transaction });
      if (putOrder) {
        return Response.redirect("https://elavor.vercel.app/order/" + Id);
      } else {
        return Response.json({ error: "Try Again" });
      }
    } else {
      return Response.redirect("https://elavor.vercel.app/order/" + Id);
    }
  } catch (error) {
    console.log(error);
    return new Response("401 Unauthorized", {
      status: 401,
    });
  }
}
