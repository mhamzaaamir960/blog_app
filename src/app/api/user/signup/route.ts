import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/schemas/user.schema";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { uploadOnCloudinary } from "@/helpers/cloudinary";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  //  get data from frontend
  // validate data is it empty
  // check it user already exists
  // hash password
  // upload image thorugh cloudinary
  // create user
  // return response

  try {
    const data = await request.json();
    const validatedData = userSchema.parse(data);
    
    const { firstName, lastName, username, email, password, profilePicture } =
    validatedData;
    const fullName = `${firstName} ${lastName ? lastName : ""}`;
    // console.log("abc")
    
    const user = await db.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
    
    if (user) {
      return NextResponse.json(
        { error: "User already exists!" },
        { status: 400 }
      );
    }

    let profilePictureUrl!: string | null;
    if (typeof profilePicture !== "undefined") {
      profilePictureUrl = await uploadOnCloudinary(
        profilePicture.webkitRelativePath
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        fullName,
        email,
        password: hashedPassword,
        profilePicture: profilePictureUrl,
        profile: {
          create: {
            bio: null,
            role: null,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully!",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((error) => ({
        path: error.path.join("."),
        message: error.message,
      }));

      return NextResponse.json(
        {
          massage: "Validation Error!",
          errors: formattedErrors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: `Something went wrong! Error: ${error}`,
      },
      { status: 500 }
    );
  }
}
