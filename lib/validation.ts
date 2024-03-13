import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Email is invalid").default(""),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .default(""),
})

const registerSchema = z.object({
  username: z
    .string()
    .min(5, "Username is required and must be at least 5 characters")
    .default(""),
  email: z.string().email("Email is invalid").default(""),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .default(""),
  acceptTerms: z
    .boolean()
    .default(true)
    .refine((value) => value, {
      message: "You must accept the terms and conditions",
    }),
})

export { registerSchema, loginSchema, z }
