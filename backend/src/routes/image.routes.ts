import express from "express";
import authmiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import {
  uploadUserImage,
  transformImage,
  getAllUsers,
  getSingleImage,
  deleteImage,
} from "../controllers/image.controller.js";

const router = express.Router();
router.post(
  "/",
  authmiddleware,
  //it prepares the request. The controller is the final step that uses the prepared data.
  upload.single("image"),
  uploadUserImage,
);
router.post("/:id/transform", authmiddleware, transformImage);
router.get("/", authmiddleware, getAllUsers);
router.get("/:id", authmiddleware, getSingleImage);
router.get("/:id", deleteImage);

export default router;
