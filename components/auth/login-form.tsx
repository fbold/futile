"use client"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultInput } from "@/components/input"
import { DefaultButton } from "@/components/buttons"
import { LoginSchema, LoginType } from "@/lib/validation"
import { useRouter } from "next/navigation"
import Link from "next/link"
import usePOST from "@/hooks/fetchers/usePOST"

export default function LoginForm() {
  const {
    register,
    handleSubmit: handleLogin,
    formState: { errors },
  } = useForm<LoginType>({
    defaultValues: { username: "frodo" },
    resolver: zodResolver(LoginSchema),
  })

  const router = useRouter()

  const { trigger, error, loading } = usePOST<LoginType>("/api/auth/login")

  const onLogin: SubmitHandler<LoginType> = async (data) => {
    console.log(data)
    const loginResult = await trigger(data)
    if (loginResult) router.push("/")
  }

  return (
    <form
      onSubmit={handleLogin(onLogin)}
      className="flex flex-col gap-2 w-full"
      noValidate
    >
      <DefaultInput
        placeholder="username"
        type="text"
        error={errors.username?.message}
        {...register("username")}
      ></DefaultInput>
      <DefaultInput
        placeholder="password"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      ></DefaultInput>
      <DefaultButton
        type="submit"
        className="justify-center"
        error={error}
        loading={loading}
      >
        login
      </DefaultButton>
      <Link href="/register" className="underline text-center mt-2 text-sm">
        make a futile account
      </Link>
    </form>
  )
}
