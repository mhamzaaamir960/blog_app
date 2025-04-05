import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { postSchema } from "@/schemas/post.schema";
import { db } from "@/lib/db";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const validatedData = postSchema.parse(data);

    const { title, category, description } = validatedData;
    const user = request.headers.get("x-user");
    console.log(request.headers)
    console.log(user)
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized user!" },
        { status: 401 }
      );
    }


    const newPost = await db.post.create({
      data: {
        title,
        category,
        description,
        authorId: user,
      },
    });

    postSchema.parse(newPost);
    if (!newPost) {
      return NextResponse.json({ error: "Post not created!" }, { status: 500 });
    }

    return NextResponse.json(
      {
        message: "Post created successfully!",
        post: newPost,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      return NextResponse.json({
        message: "Validation error!",
        errors: formattedErrors,
      });
    }

    return NextResponse.json(
      {
        error: `Something went wrong!  Error: ${error}`,
      },
      {
        status: 500,
      }
    );
  }
}
