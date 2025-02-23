import { getDataThroughToken } from "@/helpers/auth";
import { db } from "@/lib/db";
import { profileSchema } from "@/schemas/user.schema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  try {
    const { user, error, status } = await getDataThroughToken(
      request
    );
    if (error) {
      return NextResponse.json({ error }, { status });
    }
    const profile = await db.profile.findFirst({
      where: { userId: user?.id },
      include: { user: true },
    });
    console.log(user?.id);
    return NextResponse.json(profile, { status });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user, error, status } = await getDataThroughToken(request);
    const data = await request.json();
    const validateData = profileSchema.parse(data);
    console.log("abc");
    const { bio, role } = validateData;

    if (error) {
      return NextResponse.json({ error }, { status });
    }

    const profile = await db.profile.create({
      data: {
        bio: bio,
        role: role,
        userId: user!.id,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Details not added!" },
        { status: 500 }
      );
    }

    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((error) => ({
        path: error.path.join("."),
        message: error.message,
      }));

      return NextResponse.json(
        {
          message: "Validation Error!",
          error: formattedErrors,
        },
        { status: 400 }
      );
    }
  }
}
