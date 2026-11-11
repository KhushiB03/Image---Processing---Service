import { Router } from "express";
import { registerUser  ,loginUser , getCurrentUser} from "../controllers/auth.controller.js";
import authmiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
const route = Router();

route.post("/registerUser", validate(registerSchema), registerUser);
route.post("/loginUser", validate(loginSchema), loginUser);
route.get("/me" ,
    authmiddleware,
    getCurrentUser
);

export default route;

