import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await connectMongoDB();

    const user = await User.findByIdAndUpdate(id, {
      request: true,
    });
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
