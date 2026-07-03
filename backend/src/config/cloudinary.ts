//set up cloudinary
//v2 refers to Cloudinary's version 2 API.Renames v2 to cloudinary for easier usage.
    //cloudinary property names. thes enams are defined in cloudinary SDK and so should br wriite nexactly like this

import "dotenv/config.js";
import { v2 as cloudinary } from "cloudinary";

// console.log("BEFORE CONFIG", {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret_exists: !!process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log("AFTER CONFIG", cloudinary.config());

export default cloudinary;
