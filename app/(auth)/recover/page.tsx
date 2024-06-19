"use client"
import { DefaultInput } from "@/components/input"
import { RecoverySchema, RecoveryType } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

export default function Recover() {
  const {
    register,
    handleSubmit: handleRecover,
    formState: { errors },
  } = useForm<RecoveryType>({
    // defaultValues: { username: "" },
    resolver: zodResolver(RecoverySchema),
  })

  const [error, setError] = useState(false)
  const router = useRouter()

  const onSubmit: SubmitHandler<RecoveryType> = async (data) => {
    const res = await fetch("/api/auth/recover", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        recoveryPhrase: data.recoveryPhrase,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
    })

    if (!res.ok) setError(true) // TODO handle the error properly

    router.push("/login")
  }

  return (
    <div className="w-full h-full flex flex-row bg-sec">
      <div className="mx-auto flex flex-col gap-2 px-12 items-center justify-center dark:bg-pri-d">
        {/* <p>enter your username and recovery phrase (separated by spaces)</p> */}
        <form
          className="flex flex-col gap-2"
          onSubmit={handleRecover(onSubmit)}
        >
          <DefaultInput
            placeholder="username"
            error={errors.username?.message}
            {...register("username")}
          ></DefaultInput>
          <textarea
            placeholder="recovery phrase. enter the space-separated words list"
            className="bg-pri text-center h-24 text-text whitespace-break-spaces grow p-1"
            {...register("recoveryPhrase")}
          ></textarea>
          <DefaultInput
            placeholder="new password"
            error={errors.password?.message}
            {...register("password")}
          ></DefaultInput>
          <DefaultInput
            placeholder="confirm new password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          ></DefaultInput>
          <button className="underline">reset</button>
        </form>
      </div>
    </div>
  )
}
