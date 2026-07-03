import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";

import DBconnect from "./config/db.js";

const PORT = process.env.PORT || 5000;
DBconnect();
// console.log(process.env.CLOUDINARY_API_KEY);
app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`);
});