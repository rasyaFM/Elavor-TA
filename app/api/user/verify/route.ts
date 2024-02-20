import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { compareSync } from "bcrypt-ts";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return Response.json(
      { message: "email and password required" },
      { status: 400 }
    );
  }

  await connectMongoDB();

  const dataUser = await User.findOne({ email });
  if (!dataUser) {
    return Response.json({ message: "email not found" }, { status: 400 });
  }

  const userValidate = compareSync(password, dataUser.password);
  if (!userValidate) {
    return Response.json({ message: "password incorrect" }, { status: 400 });
  }

  return Response.json({
    _id: dataUser._id,
    name: dataUser.name,
    email,
    role: dataUser.role,
  });
}
