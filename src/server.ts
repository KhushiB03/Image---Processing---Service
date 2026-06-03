import app from "./app";
import dotenv from "dotenv";
import DBconnect from "./config/db";
dotenv.config();


const PORT = process.env.PORT || 5000;
DBconnect();
app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`);
});