"use client"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { TextInput } from "@/components/input"
import { DefaultButton } from "@/components/buttons"
import { RegisterSchema, RegisterType } from "@/lib/validation"
import Link from "next/link"

export default function RegisterForm() {
  const {
    register,
    handleSubmit: handleLogin,
    formState: { errors },
  } = useForm<RegisterType>({
    defaultValues: { username: "frodo" },
    resolver: zodResolver(RegisterSchema),
  })

  const [recoveryPhrase, setRecoveryPhrase] = useState("")
  const [error, setError] = useState<null | string>(null)
  const [copied, setCopied] = useState(false)

  const onRegister: SubmitHandler<RegisterType> = async (data) => {
    const submitResult = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
    const submitJson = await submitResult.json()
    if (!submitResult.ok) setError(submitJson.message)

    setRecoveryPhrase(submitJson.recoveryPhrase)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(recoveryPhrase)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  if (recoveryPhrase)
    return (
      <div className="flex flex-col gap-3 text-center md:w-1/2 items-center">
        <p className="">
          this is your recovery phrase.{" "}
          <span className="underline">copy it and save it</span> somewhere safe.
          if you forget your password or a bad actor gains access to your
          account this is the{" "}
          <span className="underline">only way to recover it.</span> once you
          leave this page it will be{" "}
          <span className="underline">gone forever.</span>
        </p>
        <p className="whitespace-pre-wrap text-red-500">
          {recoveryPhrase.split(" ").join(`\n`)}
        </p>
        <button className="underline" onClick={handleCopy}>
          {copied ? "copied" : "copy"}
        </button>
        <Link href="/" className="underline text-green-500">
          move on
        </Link>
      </div>
    )
  else
    return (
      <form
        onSubmit={handleLogin(onRegister)}
        className="flex flex-col gap-2 w-full"
        noValidate
      >
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
