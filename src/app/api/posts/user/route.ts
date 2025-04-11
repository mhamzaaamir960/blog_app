import { NextRequest, NextResponse } from "next/server";
import { getDataThroughToken } from "@/helpers/auth";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { user, status, error } = await getDataThroughToken(request);

    if (!user) {
      return NextResponse.json({ error }, { status });
    }

    const userPosts = await db.post.findMany({
      where: {
        authorId: user.id,
      },
      include: {
        author: {
          select: { fullName: true, username: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { message: "User Posts fetched successfully!", userPosts },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
