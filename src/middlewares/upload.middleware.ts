import multer from "multer"

//Don't save uploaded files to disk. Keep them in RAM (memory)."
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits:{
        fileSize: 5*1024*1024,//5MB
    }
});
export default upload;