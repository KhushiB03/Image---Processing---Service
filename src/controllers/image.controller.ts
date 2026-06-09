import Image from "../models/Image";
import uploadImage from "../utils/uploadImage";

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
