import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file have been successfully uploaded
    console.log("uploaded on cloudinary", response.url);
  } catch (error) {
    fs.unlink(localFilePath); //remove the locally saved temp file as upload been failed
    return null;
  }
}
export {uploadOnCloudinary}
