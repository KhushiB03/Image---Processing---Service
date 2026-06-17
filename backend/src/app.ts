import express from "express";
import authRoutes from "./routes/auth.routes";
import imageRoutes from "./routes/image.routes";

const app = express();
app.use(express.json());
app.use("/auth" ,authRoutes );
app.use("/images" , imageRoutes);
app.get("/" , (req , res)=>{
    res.status(200).json({
        success:true , 
        message : "Image processing API running"
    });
});

export default app;