import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { postSchema } from "@/schemas/post.schema";
import { db } from "@/lib/db";
import { ZodError } from "zod";
import { getDataThroughToken } from "@/helpers/auth";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const validatedData = postSchema.parse(data);

    const { title, category, description } = validatedData;
    const { user, error, status } = await getDataThroughToken(request);
    if (!user) {
      return NextResponse.json({ error: error }, { status: status });
    }

    console.log(title, category);
    const newPost = await db.post.create({
      data: {
        title: title,
        category: category,
        description: description,
        authorId: user.id,
      },
    });

    console.log(newPost);

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

export async function GET() {
  try {
    const posts = await db.user.findMany({
      include: {
        posts: true
      },
    });

    return NextResponse.json(
      { message: "Posts fetched successfully!", data :posts },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
