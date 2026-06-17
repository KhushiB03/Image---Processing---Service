import {  UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary";

const uploadImage = async (fileBuffer: Buffer): Promise<UploadApiResponse> => {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        //folder name i your cloudinary account
        {
          folder: "image-processing-service",
          resource_type:"image",
          transformation:[
            {width:100 , crop:"limit"},
            {quality:"auto"}
          ]
        },
        //this is a callback
        (error, result) => {
          if (error) return reject(error);
          if (!result) {
            return reject(new Error("upload failed"));
          }
          resolve(result);
        },
      )
      //send the buffer
      .end(fileBuffer);
  });
};
export default uploadImage;
