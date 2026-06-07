import DBconnect from "../config/db";
import bcrypt from "bcrypt";
import User from "../models/User";
import generateToken from "../utils/generateToken";

//register
export const registerUser = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;
    //blank field
    if (!username || !password) {
      return res.status(400).json({ message: "user already exists" });
    }
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
    const { username, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({username});
    console.log(user);
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

    const token = generateToken(user.username);
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
