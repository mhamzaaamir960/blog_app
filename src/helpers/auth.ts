import { db } from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const getDataThroughToken = async (request: NextRequest) => {
  // const token = request.cookies.get("accessToken")?.value;
  // if (!token) {
  //   return { error: "Un-authorized Request!", status: 401 };
  // }
  let verifiedToken: JwtPayload;
  try {
    try {
      verifiedToken = jwt.verify(
        // token,
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YmI1YzhiMjUyZjE3OTI2MDQ0MjQ5ZSIsImVtYWlsIjoiZmF6ZWVsNEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZhemVlbDQiLCJwYXNzd29yZCI6IiQyYiQxMCRLRUFsclF5SnZoQ2lheDIyVXJVQy51bnA4bDUyRjRNbC9ZMEQ1eTFVSzk5WkM1bjRrLnZxNiIsImlhdCI6MTc0MDMzMjIwNiwiZXhwIjoxNzQxMTk2MjA2fQ.Ct-7bOQ0alFqyZENeNi0NdZM1beGi-EinEquePBjw_g",
        process.env.ACCESS_TOKEN_SECRET!
      ) as JwtPayload;
    } catch (error) {
      return { error: "Invalid or Expired Token", status: 403 };
    }

    // console.log("verfiedId", verifiedToken);
    const user = await db.user.findFirst({
      where: {
        id: verifiedToken.id,
      },
      select: {
        id: true,
        profilePicture: true,
        username: true,
        fullName: true,
        email: true,
        comments: true,
        posts: true,
        profile: true,
        like: true,
      },
    });
    // console.log(user);

    if (!user) {
      return { error: "User not found!", status: 404 };
    }

    return { user, status: 200 };
  } catch (error: unknown) {
    return { error: `Error: ${error}`, status: 500 };
  }
};
