"use client"
import EmailSignOn from "@/components/auth/login-form"
import ProviderButtons from "@/components/auth/provider-buttons"
// import { Gatherbun } from "@/components/branding/logo"
import { DefaultButton } from "@/components/buttons"
// import Button from "@/components/core/button"
import { IconChevronLeft } from "@tabler/icons-react"
import { useState } from "react"

export default function LoginPanel() {
  const [showEmailForm, setShowEmailForm] = useState(false)
  return (
    <div className="w-full h-full flex flex-row bg-sec">
      <div className="mx-auto flex flex-col gap-2 px-12 items-center justify-center dark:bg-pri-d">
        <p className="mb-10">futile</p>
        <EmailSignOn />
      </div>
      {/* <div className="hidden lg:block lg:w-1/2"></div> */}
    </div>
  )
}
