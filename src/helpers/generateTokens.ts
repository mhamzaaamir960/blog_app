import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

export const generateAccessToken = (userDetails: any) => {
  try {
    const token = jwt.sign(
      {
        id: userDetails.id,
        email: userDetails.email,
        username: userDetails.username,
        password: userDetails.password,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    console.log(`Generated Access Token: ${token}`);
    return token;
  } catch (error) {
    console.log(`Aceess Token Error: ${error}`);
  }
};

const generateRefreshToken = (userDetails: any) => {
  try {
    return jwt.sign({ id: userDetails.id }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
  } catch (error) {
    console.log(`Refresh Token Error: ${error}`);
  }
};

export const generateAccessAndRefreshToken = async (userDetails: any) => {
  try {
    const user: any = await db.user.findFirst({
      where: {
        id: userDetails.id,
      },
    });

    const accessToken = generateAccessToken(userDetails);
    const refreshToken = generateRefreshToken(userDetails);

    // console.log(userDetails.id)

    await db.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(`Token Error: ${error}`);
  }
};
