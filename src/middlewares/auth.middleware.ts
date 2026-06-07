import { Request , Response , NextFunction } from "express";
import jwt from "jsonwebtoken";

const authmiddleware=(req:Request , res:Response , next: NextFunction)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader?.startsWith("Bearer ")){
            // not starting with bearere then reject request
            return res.status(401).json({
                message:'Unauthorized',
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(//2 args
            token,//token
            process.env.JWT_SECRET as string,//secret key

        );
        //“Attach the decoded user data to the request object so that the next middleware or route can use it.”
        (req as any ).user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            message:"invalid token"
        })
        
    }
}
export default authmiddleware;