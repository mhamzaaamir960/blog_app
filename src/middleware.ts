import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token: string = request.cookies.get("accessToken")?.value || "";
  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  const { pathname } = request.nextUrl;

  const isPublicPath = pathname === "/login" || pathname === "/signup";

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
