"use client"
import { signIn } from "next-auth/react"
import { IconBrandGoogle, IconBrandX, IconMail } from "@tabler/icons-react"
import { DefaultButton } from "@/components/buttons"

type Props = {
  withEmail: () => void
}

export default function ProviderButtons({ withEmail }: Props) {
  return (
    <>
      <DefaultButton
        className="w-full flex bg-pri relative"
        onClick={() => signIn("google")}
      >
        <IconBrandGoogle className="text-text absolute left-2" />{" "}
        <span className="flex-1 text-text">Continue with Google</span>
      </DefaultButton>
      <DefaultButton
        className="w-full flex bg-pri relative"
        onClick={() => signIn("google")}
      >
        <IconBrandX className="text-text absolute left-2" />{" "}
        <span className="flex-1 text-text">Continue with X</span>
      </DefaultButton>
      <DefaultButton
        className="w-full flex bg-pri relative"
        onClick={withEmail}
      >
        <IconMail className="text-text absolute left-2" />{" "}
        <span className="flex-1 text-text">Continue with email</span>
      </DefaultButton>
    </>
  )
}
