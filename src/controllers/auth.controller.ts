import DBconnect from "../config/db";
import bcrypt from "bcrypt";
import User from "../models/User";


export const registerUser = async(req :any, res : any)=>{
    try {
        const { username , password} = req.body;
        //blank field
        if(! username || !password){
            return res.status(400).json({message : "user already exists"});
        }
        //non unique names
        const existingUser = await User.findOne(username);
        if(existingUser){
            return res.status(400).json({message:"user already exists"});

        }

        const hashedpassword = await bcrypt.hash(password,10);
        //to save smthng to schemas u need this format only
        const user = await User.create({
            username ,
            password: hashedpassword
        });
        res.status(201).json({
            message:"user registered succesfully",
            user:{
                id: user._id,
                username: user.username
            }
        });

    } catch (error) {
        res.status(500).json({
            message: " server error"
        });
        
    }
};