import MidTrans from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new MidTrans.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_MIDTRANS,
  clientKey: process.env.CLIENT_MIDTRANS,
});

export async function POST(req) {
  const { orderId, totalPrice, profile, packages, transactionId } =
    await req.json();

  let parameter = {
    item_details: {
      name: packages.name,
      price: Math.trunc(totalPrice),
      transaction_id: transactionId,
      quantity: 1,
    },
    transaction_details: {
      order_id: orderId + "_" + String(transactionId),
      gross_amount: Math.trunc(totalPrice),
    },
    customer_details: {
      name_cus: profile.name,
      email: profile.email,
      phone: profile.phone,
    },
  };

  const result = await snap.createTransaction(parameter);
  return NextResponse.json({ result });
}
