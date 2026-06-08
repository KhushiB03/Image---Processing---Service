//set up cloudinary
//v2 refers to Cloudinary's version 2 API.Renames v2 to cloudinary for easier usage.
import {v2 as cloudinary} from "cloudinary";
cloudinary.config({
    //cloudinary property names. thes enams are defined in cloudinary SDK and so should br wriite nexactly like this
    
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET,

});

export default cloudinary;