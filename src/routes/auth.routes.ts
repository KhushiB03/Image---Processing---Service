import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";
const route = Router();

route.post("/registerUser" , registerUser);

export default route;

