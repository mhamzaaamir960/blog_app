import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function uploadOnCloudinary(file: string ) {
  try {
    const response = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    console.log(`Successfully upload image on cloudinary! ${response.url}`);
    return response.url;
  } catch (error: unknown) {
    console.log(`Failed to upload image on cloudinary! ${error}`);
    return null;
  }
}
