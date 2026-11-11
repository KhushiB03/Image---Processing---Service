import { z } from "zod";

export const MAX_DIMENSION = 5000;

// The frontend sends form values as strings and "" for empty inputs.
// Treat blank values as "not provided" and turn numeric strings into numbers.
// Any other type (object, array, boolean) goes to z.number() unchanged and is rejected.
const toOptionalNumber = (value: unknown) => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" ? undefined : Number(trimmed);
  }
  return value;
};

const blankToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

const dimension = z.preprocess(
  toOptionalNumber,
  z
    .number()
    .int("Must be a whole number")
    .positive("Must be greater than 0")
    .max(MAX_DIMENSION, `Must be at most ${MAX_DIMENSION}`)
    .optional(),
);

export const transformSchema = z.object({
  width: dimension,
  height: dimension,
  rotate: z.preprocess(
    toOptionalNumber,
    z
      .number()
      .min(-360, "Rotation must be between -360 and 360")
      .max(360, "Rotation must be between -360 and 360")
      .optional(),
  ),
  format: z.preprocess(
    blankToUndefined,
    z.enum(["jpeg", "png", "webp"]).default("jpeg"),
  ),
});

export type TransformInput = z.infer<typeof transformSchema>;
