import { NextFunction, Request, Response } from "express";
import { z } from "zod";

// Validates req.body against a schema and replaces it with the parsed result,
// so controllers only receive known, correctly typed fields.
const validate =
  (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body ?? {});

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    req.body = result.data;
    next();
  };

export default validate;
