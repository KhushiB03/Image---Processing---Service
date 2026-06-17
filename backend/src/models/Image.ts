import mongoose from "mongoose";
const ImageSchema = new mongoose.Schema(
    {
        //stores id of the user
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",//This creates a relationship with the User model.
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    //This is Cloudinary's unique identifier for the uploaded image.
    //used to delete or update image
    //without going to cloudinary
    publicId:{
        type:String,
        required:true,
    },
    //Stores the file name that the user uploaded.
    originalName:{
        type:String,
        required:true,
    },
    width:Number ,
    height : Number,
    format:String,
},
//auomatically add createdat and uupdated add
{timestamps:true},
)
const Image = mongoose.model("Image" , ImageSchema);
export default Image;