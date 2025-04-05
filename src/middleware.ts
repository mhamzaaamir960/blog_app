import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token: string = request.cookies.get("accessToken")?.value || "";
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let decodedToken: string | JwtPayload;

  try {
    decodedToken = jwt.verify(
      token,    
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;

    if (!decodedToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const response = NextResponse.next();
    response.headers.set("x-user", decodedToken.userId);
    // console.log(decodedToken);

    return response;
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/profile/:path", "/new-blog/:path"],
};
