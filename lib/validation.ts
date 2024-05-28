import { z } from "zod"

const LoginSchema = z.object({
  username: z.string().min(4, "Must be at least 4 characters"),
  password: z.string().min(10, "Should be at least 10 characters"),
})

export type LoginType = z.infer<typeof LoginSchema>

const RegisterSchema = z
  .object({
    username: z.string().min(4, "Must be at least 4 characters"),
    password: z.string().min(10, "Must be at least 10 characters"),
    confirmPassword: z.string().min(10, "Must be at least 10 characters"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Passwords don't match",
      })
    }
  })

export type RegisterType = z.infer<typeof RegisterSchema>

export { RegisterSchema, LoginSchema, z }
