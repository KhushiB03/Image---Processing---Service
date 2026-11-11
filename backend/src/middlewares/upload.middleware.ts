import { NextFunction, Request, Response } from "express";
import multer from "multer";

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; //5MB

// thrown by fileFilter so it can be told apart from multer's own errors
class InvalidFileTypeError extends Error {}

//Don't save uploaded files to disk. Keep them in RAM (memory)."
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
  },
  // rejects the file before it is read into memory.
  // The mimetype is supplied by the client, so the controller checks the real bytes again with sharp.
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new InvalidFileTypeError(
          "Only JPEG, PNG, WEBP or GIF images are allowed",
        ),
      );
    }
  },
});

const multerErrorMessages: Partial<Record<multer.ErrorCode, string>> = {
  LIMIT_FILE_COUNT: "Only one file can be uploaded at a time",
  LIMIT_UNEXPECTED_FILE: 'The file must be sent in the "image" field',
};

// Runs upload.single(fieldName) and turns upload errors into 413/400 responses
// instead of letting them reach Express's default 500 handler.
export const uploadSingleImage =
  (fieldName: string) => (req: Request, res: Response, next: NextFunction) => {
    upload.single(fieldName)(req, res, (err: unknown) => {
      if (!err) return next();

      if (err instanceof InvalidFileTypeError) {
        return res.status(400).json({ message: err.message });
      }

      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(413).json({
            message: `File is too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)} MB`,
          });
        }
        return res.status(400).json({
          message: multerErrorMessages[err.code] ?? "Invalid upload request",
        });
      }

      // malformed multipart body or another unexpected error: log it, keep details server-side
      console.error(err);
      return res.status(400).json({ message: "Invalid upload request" });
    });
  };

export default upload;
