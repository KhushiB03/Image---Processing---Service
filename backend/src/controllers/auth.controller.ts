import DBconnect from "../config/db.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { LoginInput, RegisterInput } from "../validators/auth.validator.js";

//register
export const registerUser = async (req: any, res: any) => {
  try {
    // already validated by registerSchema (see auth.routes.ts):
    // both are strings, so they cannot carry Mongo query operators
    const { username, password } = req.body as RegisterInput;
    //non unique names
    //curly bracket around username for {] to show it is object based

    //{ username: username }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    //to save smthng to schemas u need this format only
    const user = await User.create({
      username,
      password: hashedpassword,
    });
    res.status(201).json({
      message: "user registered succesfully",
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: " server error",
    });
  }
};
//login
export const loginUser = async (req: any, res: any) => {
  try {
    // already validated by loginSchema (see auth.routes.ts)
    const { username, password } = req.body as LoginInput;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id.toString());
    res.status(200).json({
      message: "login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "server occured!",
    });
  }
};
//get current user
export const getCurrentUser = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.staus(200).json({ message: user });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};
//register then login id right then generate token

