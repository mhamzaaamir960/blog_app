import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    (await cookies()).set("accessToken", "", {
      expires: new Date(0),
      path: "/",
    });

    (await cookies()).set("refreshToken", "", {
      expires: new Date(0),
      path: "/",
    });

    return NextResponse.json(
      { message: "Logout successfull!" },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
