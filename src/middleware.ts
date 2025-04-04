import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token: string = request.cookies.get("accessToken")?.value || "";
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  try {
    let verifyToken: string | JwtPayload;

    try {
      verifyToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
      ) as JwtPayload;
    } catch (error) {
      return NextResponse.json(
        { error: "Unauthorized request" },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { message: "Authorized request" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Un-authorized request" },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: ["/profile"],
};
