import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { NextRequest } from "next/server";

const hashPass = (password: string) => {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash;
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const address = formData.get("address") ?? undefined;
    const phone = formData.get("phone") ?? undefined;
    const image = formData.get("image") ?? undefined;
    const role = formData.get("role") ?? "client";

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
      address,
      phone,
      image,
    });

    const dataToken = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    };

    return Response.json(
      { message: "Success created new user", data: dataToken },
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
  const authToken = (request.headers.get("authorization") ?? "")
    .split("Bearer ")
    .at(1);

  const searchParams = request.nextUrl.searchParams;
  if (authToken) {
    try {
      const page = parseInt(searchParams.get("page") as string);
      const limit = parseInt(searchParams.get("limit") as string);

      //   const dataUser = jwt.verify(authToken, process.env.TOKENKEY);
      if (true) {
        await connectMongoDB();

        if (page && limit) {
          const startIndex = (page - 1) * limit;
          const endIndex = page * limit;
          const totalRecords = await User.countDocuments();
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

          const allUser = await User.find().limit(limit).skip(startIndex);
          return Response.json({
            next,
            previous,
            totalRecords,
            userDatas: allUser,
          });
        } else {
          const allUser = await User.find();
          return Response.json({ userDatas: allUser });
        }
      }
    } catch (error) {
      return new Response("401 Unauthorized", {
        status: 401,
      });
    }
  }
  return new Response("Users API's, All Good", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function DELETE(request: NextRequest) {
  try {
    const { _id } = await request.json();
    if (!_id)
      return Response.json({ message: "_id required" }, { status: 400 });
    await connectMongoDB();
    const status = await User.deleteOne({ _id });
    return Response.json(
      { message: "Success delete user", status },
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
