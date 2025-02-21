import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { generateAccessAndRefreshToken } from "@/helpers/generateTokens";

export async function POST(request: NextRequest) {
  try {
    const { identifier, password } = await request.json();

    const user: any = await db.user.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
      },
    });

    console.log(user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 405 });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return NextResponse.json({ error: "Wrong Password!" }, { status: 400 });
    }

    const { accessToken, refreshToken }: any =
      await generateAccessAndRefreshToken(user);

    const options = {
      httpOnly: true,
      secure: true,
    };

    const response = NextResponse.json(
      { message: "User Loggedin successfully!" },
      { status: 201 }
    );

    response.cookies.set("accessToken", accessToken, options);
    response.cookies.set("refreshToken", refreshToken, options);

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: "Something went wrong!" + error.message },
      { status: 500 }
    );
  }
}
