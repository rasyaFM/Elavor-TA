import connectMongoDB from "@/lib/mongodb";
import Package from "@/models/package";
import User from "@/models/user";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { image, userId, name, price, category, desc, cusItem } =
      await request.json();

    if (!name || !price || !desc || !userId)
      return Response.json(
        { message: "name, price, and decs required" },
        { status: 400 }
      );

    await connectMongoDB();

    const emailValidation = await User.findOne({ _id: userId });

    if (!emailValidation)
      return Response.json({ message: "User id not found" }, { status: 400 });

    const role = emailValidation.role;

    if (role === "admin" || role === "organizer") {
      const data = await Package.create({
        userId,
        name,
        price,
        description: desc,
        category,
        customItem: cusItem,
        image,
      });

      return Response.json(
        { message: "Success created new package", data },
        { status: 201 }
      );
    }
    return Response.json({ message: "Access denied" }, { status: 400 });
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
  const organizerId = searchParams.get("id") as string;
  if (organizerId) {
    try {
      const page = parseInt(searchParams.get("page") as string);
      const limit = parseInt(searchParams.get("limit") as string);
      await connectMongoDB();
      if (page && limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const totalRecords = await Package.countDocuments();
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

        const allPackage = await Package.find({ userId: organizerId })
          .limit(limit)
          .skip(startIndex);
        return Response.json({
          next,
          previous,
          totalRecords,
          packageDatas: allPackage,
        });
      } else {
        const allPackage = await Package.find({ userId: organizerId });
        return Response.json({ packageDatas: allPackage });
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
        const totalRecords = await Package.countDocuments();
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

        const allPackage = await Package.find().limit(limit).skip(startIndex);
        return Response.json({
          next,
          previous,
          totalRecords,
          packageDatas: allPackage,
        });
      } else {
        const allPackage = await Package.find();
        return Response.json({ packageDatas: allPackage });
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
    const status = await Package.deleteOne({ _id });
    return Response.json(
      { message: "Success delete package", status },
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
    const { _id, image, userId, name, price, category, desc, cusItem } =
      await request.json();

    if (!userId)
      return Response.json({ message: "userId required" }, { status: 400 });
    await connectMongoDB();

    const user = await Package.findByIdAndUpdate(_id, {
      name,
      image,
      price,
      category,
      description: desc,
      customItem: cusItem,
    });

    return Response.json(
      { message: "Success edit package", user },
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
