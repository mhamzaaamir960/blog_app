import { getDataThroughToken } from "@/helpers/auth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await getDataThroughToken(request);
    return user
  } catch (error) {
    console.log(error);
  }
}
