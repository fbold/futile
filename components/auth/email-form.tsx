"use client"
import { signIn } from "next-auth/react"
import { z } from "zod"
// import { TextInput } from "@/components/core/text-input"
// import Button from "@/components/core/button"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { redirect } from "next/navigation"
import { TextInput } from "@/components/input"
import { DefaultButton } from "@/components/buttons"

const LoginSchema = z
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

type LoginType = z.infer<typeof LoginSchema>

export default function EmailSignOn() {
  const [needsRegister, setNeedsRegister] = useState(false)

  const {
    register,
    handleSubmit: handleLogin,
    formState: { errors },
  } = useForm<LoginType>({
    defaultValues: { username: "frodo" },
    resolver: zodResolver(LoginSchema),
  })

  // const onLogin: SubmitHandler<LoginType> = async (data) => {
  //   if (!needsRegister) {
  //     const signInAttempt = await signIn("email", {
  //       email: data.email,
  //       redirect: false,
  //     })

  //     if (signInAttempt?.error === null) redirect("/")
  //     else {
  //       setNeedsRegister(true)
  //     }
  //   } else {
  //     console.log("register")
  //     const register = await fetch("/api/auth/register", {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //     })
  //     if (register.ok)
  //       signIn("email", {
  //         email: data.email,
  //         callbackUrl: "/",
  //       })
  //   }
  // }

  const onLogin: SubmitHandler<LoginType> = async (data) => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleLogin(onLogin)}
      className="flex flex-col gap-2 w-full"
      noValidate
    >
      {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
      <TextInput
        placeholder="username"
        type="text"
        error={errors.username?.message ?? null}
        {...register("username")}
      ></TextInput>
      <TextInput
        placeholder="password"
        type="password"
        error={errors.password?.message ?? null}
        {...register("password")}
      ></TextInput>
      <TextInput
        placeholder="password (again)"
        type="password"
        error={errors.confirmPassword?.message ?? null}
        {...register("confirmPassword")}
      ></TextInput>
      <DefaultButton type="submit" className="justify-center">
        Create Account
      </DefaultButton>
    </form>
  )
}
