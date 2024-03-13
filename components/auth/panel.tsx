"use client"
import EmailSignOn from "@/components/auth/email-form"
import ProviderButtons from "@/components/auth/provider-buttons"
// import { Gatherbun } from "@/components/branding/logo"
import { DefaultButton } from "@/components/buttons"
// import Button from "@/components/core/button"
import { IconChevronLeft } from "@tabler/icons-react"
import { useState } from "react"

export default function LoginPanel() {
  const [showEmailForm, setShowEmailForm] = useState(false)
  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-full h-full lg:w-1/2 flex flex-col gap-2 px-12 items-center justify-center bg-sec dark:bg-pri-d">
        {/* <h2 className="text-6xl underline font-bold text-center my-6 font-josefin text-transparent bg-gradient-to-l from-action to-accent -tracking-wider bg-clip-text ">
          gatherbun
        </h2> */}
        <div className="mb-10">{/* <Gatherbun /> */}</div>
        {showEmailForm ? (
          <>
            <DefaultButton
              className="w-full flex bg-pri !text-text text-center relative"
              onClick={() => setShowEmailForm(false)}
            >
              <IconChevronLeft className="absolute left-0" />
              <span className="flex-1">Other options</span>
            </DefaultButton>
            <EmailSignOn />
          </>
        ) : (
          <ProviderButtons withEmail={() => setShowEmailForm(true)} />
        )}
        {/* <Link
          href="/register"
          className="text-txt-pri dark:text-txt-pri-d underline text-center text-sm"
        >
          Need an account? Click me!
        </Link> */}
      </div>
      <div className="hidden lg:block lg:w-1/2"></div>
    </div>
  )
}
