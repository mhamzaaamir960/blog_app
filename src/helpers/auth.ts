import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const getDataThroughToken = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value || "";
  let verifiedToken: string | JwtPayload;
  try {
    verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

    if (!verifiedToken) {
      return NextResponse.json(
        { error: "Unauthorized Request!" },
        { status: 401 }
      );
    }

    return verifiedToken.id;
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as ZodError).message },
      { status: 500 }
    );
  }
};
