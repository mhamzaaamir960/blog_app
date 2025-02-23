import { db } from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const getDataThroughToken = async (request: NextRequest) => {
  const token =
    request.cookies.get("accessToken")?.value || "";
  let verifiedToken: JwtPayload;
  try {
    verifiedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;

    if (!verifiedToken) {
      return NextResponse.json(
        { error: "Unauthorized Request!" },
        { status: 401 }
      );
    }

    // console.log("verfiedId", verifiedToken);
    const user = await db.user.findFirst({
      where: {
        id: verifiedToken.id,
      },
      select: {
        profilePicture:true,
        username: true,
        fullName: true,
        email: true,
        comments: true,
        posts: true,
        profile: true,
        like: true,
      },
    });
    console.log(user);

    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as ZodError).message },
      { status: 500 }
    );
  }
};
