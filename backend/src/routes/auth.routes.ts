import { Router } from "express";
import { registerUser  ,loginUser , getCurrentUser} from "../controllers/auth.controller.js";
import authmiddleware from "../middlewares/auth.middleware.js";
const route = Router();

route.post("/registerUser" , registerUser);
route.post("/loginUser" , loginUser)
route.get("/me" ,
    authmiddleware,
    getCurrentUser
);

export default route;

