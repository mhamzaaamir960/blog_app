import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token: string | undefined = request.cookies.get("accessToken")?.value;
  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
    let verifyToken: JwtPayload;
    try {
      try {
        verifyToken = jwt.verify(
          token!,
          process.env.ACCESS_TOKEN_SECRET!
        ) as JwtPayload;
      } catch (error) {
        return NextResponse.json(
          { error: "Unauthorized request" },
          { status: 401 }
        );
      }

    //   const userId = new Headers()
    //   userId.set("userId", verifyToken?.id);

      request.headers.set("userId", verifyToken.id);
    //   console.log(request.headers.get("userId"));

    return NextResponse.next()
    } catch (error) {}
  }
}

export const config = {
    matcher: '/'
}
