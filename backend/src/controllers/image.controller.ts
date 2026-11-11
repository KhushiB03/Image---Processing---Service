import mongoose from "mongoose";
import sharp from "sharp";
import cloudinary from "../config/cloudinary.js";
import Image from "../models/Image.js";
import uploadImage from "../utils/uploadImage.js";
import { TransformInput } from "../validators/image.validator.js";
//upload image
export const uploadUserImage = async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "insert a file",
      });
    }

    // console.log("req.file:", req.file);
    // console.log("req.user:", req.user);

    const uploaded = await uploadImage(req.file.buffer);

    const image = await Image.create({
      userId: req.user.userId,
      imageUrl: uploaded.secure_url,
      publicId: uploaded.public_id,
      originalName: req.file.originalname,
    });

    return res.status(200).json({
      message: "file uploaded successfully",
      image,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: "internal error occurred",
      error: error.message,
    });
  }
};
//transform image
export const transformImage = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid image id",
      });
    }

    const image = await Image.findOne({ _id: id, userId: req.user.userId });

    if (!image) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    // already validated and typed by transformSchema (see image.routes.ts)
    const { width, height, rotate, format } = req.body as TransformInput;

    const response = await fetch(image.imageUrl);

    const arrayBuffer =
      //arraybuffer has raw bytes of file
      await response.arrayBuffer();

    //Buffer converts arraybuffer to nodejs biffer
    const buffer = Buffer.from(arrayBuffer);

    let transformed = sharp(buffer);

    if (width !== undefined || height !== undefined) {
      // a missing side is left undefined so sharp keeps the aspect ratio
      transformed = transformed.resize(width, height);
    }

    if (rotate !== undefined) {
      transformed = transformed.rotate(rotate);
    }

    let outputBuffer: Buffer;

    switch (format) {
      case "png":
        outputBuffer = await transformed.png().toBuffer();
        break;

      case "webp":
        outputBuffer = await transformed.webp().toBuffer();
        break;

      default:
        outputBuffer = await transformed.jpeg().toBuffer();
    }

    const uploaded = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "image-processing-service",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        //assigned chunks and close the response
        .end(outputBuffer);
    });

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
      message: "Image transformed successfully",
      image: newImage,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Transformation failed",
    });
  }
};
//getAllUsers
export const getAllUsers = async (req: any, res: any) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const images = await Image.find({
      userId: req.user.userId,
    })
      //-1 means decreasing order: newest first
      .sort({ createdAt: -1 })
      //skip previous page records
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json({
      images,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to retrieve images from cloudinary",
    });
  }
};
//getSingleImage
export const getSingleImage = async (req: any, res: any) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid image id",
      });
    }

    const image = await Image.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!image) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    return res.status(200).json({
      image,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch the image",
    });
  }
};
//delete image
export const deleteImage = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid image id",
      });
    }

    const image = await Image.findOne({
      _id: id,
      userId: req.user.userId,
    });

    if (!image) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    await cloudinary.uploader.destroy(image.publicId);

    await image.deleteOne();

    return res.status(200).json({
      message: "Image successfully deleted",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete image",
    });
  }
};