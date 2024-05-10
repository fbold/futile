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

const LoginSchema = z.object({
  username: z.string().min(4, "Must be at least 4 characters"),
  password: z.string().min(10, "Should be at least 10 characters"),
})

type LoginType = z.infer<typeof LoginSchema>

export default function LoginForm() {
  const {
    register,
    handleSubmit: handleLogin,
    formState: { errors },
  } = useForm<LoginType>({
    defaultValues: { username: "frodo" },
    resolver: zodResolver(LoginSchema),
  })

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
      <DefaultButton type="submit" className="justify-center">
        login
      </DefaultButton>
    </form>
  )
}
