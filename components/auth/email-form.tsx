"use client"
import { signIn } from "next-auth/react"
import { z } from "zod"
// import { TextInput } from "@/components/core/text-input"
// import Button from "@/components/core/button"
import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { redirect } from "next/navigation"
import { TextInput } from "@/components/input"
import { DefaultButton } from "@/components/buttons"

const LoginSchema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
  name: z.string().min(2, "Must be at least 2 characters"),
})

type LoginType = z.infer<typeof LoginSchema>

export default function EmailSignOn() {
  const [needsRegister, setNeedsRegister] = useState(false)

  const {
    register,
    handleSubmit: handleLogin,
    formState: { errors },
  } = useForm<LoginType>({
    defaultValues: { email: "fred@fred.com" },
  })

  const onLogin: SubmitHandler<LoginType> = async (data) => {
    if (!needsRegister) {
      const signInAttempt = await signIn("email", {
        email: data.email,
        redirect: false,
      })

      if (signInAttempt?.error === null) redirect("/")
      else {
        setNeedsRegister(true)
      }
    } else {
      console.log("register")
      const register = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      })
      if (register.ok)
        signIn("email", {
          email: data.email,
          callbackUrl: "/",
        })
    }
  }

  return (
    <form
      onSubmit={handleLogin(onLogin)}
      className="flex flex-col gap-2 w-full"
      noValidate
    >
      {needsRegister ? (
        <TextInput
          placeholder="Name"
          type="text"
          error={errors.name?.message ?? null}
          {...register("name", { required: true })}
        ></TextInput>
      ) : null}
      <TextInput
        placeholder="Email"
        type="email"
        error={errors.email?.message ?? null}
        {...register("email", { required: true })}
      ></TextInput>
      <DefaultButton className="justify-center">Create Account</DefaultButton>
    </form>
  )
}
