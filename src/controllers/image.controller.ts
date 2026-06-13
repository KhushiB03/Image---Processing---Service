import Image from "../models/Image";
import sharp from "sharp";
import cloudinary from "../config/cloudinary";
import uploadImage from "../utils/uploadImage";
import { resolve } from "node:dns";
import { rejects } from "node:assert";

export const uploadUserImage = async (req: any, res: any) => {
  try {
    if (!req.file) {
      res.status(400).json({
        message: "insert a file",
      });
    }
    const uploaded = await uploadImage(req.file.buffer);
    const image = await Image.create({
      userId: req.user.userId,
      imageUrl: uploaded.secure_url,
      publicId: uploaded.public_id,
      originalName: req.file.originalname,
    });
    res.status(200).json({
      message: "file uploaded successfully",
      image,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal error occured",
    });
  }
};
//transform image 
export const transformImage = async (
  req: any,
  res: any
) => {
  try {
    const image = await Image.findById(
      req.params.id
    );

    if (!image) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    const { width, height, rotate, format } =
      req.body;

    const response = await fetch(
      image.imageUrl
    );

    const arrayBuffer =
      await response.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    let transformed = sharp(buffer);

    if (width || height) {
      transformed = transformed.resize(
        Number(width),
        Number(height)
      );
    }

    if (rotate) {
      transformed = transformed.rotate(
        Number(rotate)
      );
    }

    let outputBuffer: Buffer;

    switch (format) {
      case "png":
        outputBuffer = await transformed
          .png()
          .toBuffer();
        break;

      case "webp":
        outputBuffer = await transformed
          .webp()
          .toBuffer();
        break;

      default:
        outputBuffer = await transformed
          .jpeg()
          .toBuffer();
    }

    const uploaded = await new Promise<any>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder:
                "image-processing-service",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(outputBuffer);
      }
    );

    const newImage = await Image.create({
      userId: req.user.userId,
      imageUrl: uploaded.secure_url,
      publicId: uploaded.public_id,
      originalName: image.originalName,
      width,
      height,
      format,
    });

    res.status(200).json({
      message:
        "Image transformed successfully",
      image: newImage,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Transformation failed",
    });
  }
};