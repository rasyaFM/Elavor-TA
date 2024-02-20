import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { genSaltSync, hashSync } from "bcrypt-ts";

const hashPass = (password: string) => {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash;
};

export async function POST(request: Request) {
  try {
    let { name, email, password, role } = await request.json();
    if (!role) {
      role = "klien";
    }

    if (!name || !email || !password)
      return Response.json(
        { message: "name, email, and password required" },
        { status: 400 }
      );

    const hash = hashPass(password as string);

    await connectMongoDB();

    const emailValidation = await User.findOne({ email: email });
    if (emailValidation)
      return Response.json(
        { message: "Email is already registered" },
        { status: 400 }
      );

    const data = await User.create({
      name,
      email,
      password: hash,
      role,
    });

    return Response.json(
      { message: "Success created new user", data },
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

export async function PUT(request: Request) {
  try {
    let { name, email, password, role, address, phone, _id } =
      await request.json();

    let hash;
    if (password) {
      hash = hashPass(password as string);
    }

    if (!name || !email)
      return Response.json(
        { message: "name, email, and password required" },
        { status: 400 }
      );
    await connectMongoDB();

    const user = await User.findByIdAndUpdate(_id, {
      name,
      email,
      role,
      address: address ? address : undefined,
      phone: phone ? phone : undefined,
      password: hash ? hash : undefined,
    });
    console.log(_id);
    return Response.json(
      { message: "Success edit user", user },
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
