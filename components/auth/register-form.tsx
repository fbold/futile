"use client"
import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { TextInput } from "@/components/input"
import { DefaultButton } from "@/components/buttons"
import { RegisterSchema, RegisterType } from "@/lib/validation"

export default function RegisterForm() {
  const {
    register,
    handleSubmit: handleLogin,
    formState: { errors },
  } = useForm<RegisterType>({
    defaultValues: { username: "frodo" },
    resolver: zodResolver(RegisterSchema),
  })

  const onRegister: SubmitHandler<RegisterType> = async (data) => {
    console.log(data)
    fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  return (
    <form
      onSubmit={handleLogin(onRegister)}
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
        register
      </DefaultButton>
    </form>
  )
}
