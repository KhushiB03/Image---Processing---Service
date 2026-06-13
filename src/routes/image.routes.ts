import  express  from "express";
import authmiddleware from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";
import {uploadUserImage , transformImage ,  } from "../controllers/image.controller";

const router = express.Router();
router.post("/"  , 
    authmiddleware ,
    //it prepares the request. The controller is the final step that uses the prepared data.
    upload.single("image"),
    uploadUserImage
);
router.post(
  "/:id/transform",
  authmiddleware,
  transformImage
);

export default router;
