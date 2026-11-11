import { z } from "zod";

// bcrypt only uses the first 72 *bytes* of a password, so multi-byte
// characters must be counted in bytes, not string length.
const BCRYPT_MAX_BYTES = 72;

// z.object strips unknown keys by default, so only these fields reach the controller.
export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username may only contain letters, numbers and underscores",
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be at most 72 characters")
    .refine(
      (value) => Buffer.byteLength(value, "utf8") <= BCRYPT_MAX_BYTES,
      `Password must be at most ${BCRYPT_MAX_BYTES} bytes`,
    ),
});

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
