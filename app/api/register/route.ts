import { connectToDatabase } from "@/utils/connect";
import User from "@/utils/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
  try {
    const { name, username, email, password } = await req.json();

    await connectToDatabase();

    const userExists = await User.findOne({ $or: [{ username }, { email }] });

    if (userExists) {
      return new NextResponse("User already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return new NextResponse(newUser, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};
