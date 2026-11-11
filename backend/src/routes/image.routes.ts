import express from "express";
import {
  deleteImage,
  getAllUsers,
  getSingleImage,
  transformImage,
  uploadUserImage,
} from "../controllers/image.controller.js";
import authmiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { transformSchema } from "../validators/image.validator.js";

const router = express.Router();
router.post(
  "/",
  authmiddleware,
  //it prepares the request. The controller is the final step that uses the prepared data.
  upload.single("image"),
  uploadUserImage,
);
router.post(
  "/:id/transform",
  authmiddleware,
  validate(transformSchema),
  transformImage,
);
router.get("/", authmiddleware, getAllUsers);
router.get("/:id", authmiddleware, getSingleImage);
router.delete("/:id", authmiddleware, deleteImage);

export default router;
