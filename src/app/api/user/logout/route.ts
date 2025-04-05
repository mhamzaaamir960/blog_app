import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
      { message: "Logout successfull!" },
      { status: 200 }
    );
    response.cookies.set("accessToken", "", {
      expires: new Date(0),
      secure: true,
      httpOnly: true,
      path: "/",
    });

    response.cookies.set("refreshToken", "", {
      expires: new Date(0),
      secure: true,
      httpOnly: true,
      path: "/",
    });
    return response;
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
