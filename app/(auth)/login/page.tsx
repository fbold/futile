import LoginForm from "@/components/auth/login-form"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function Login() {
  const session = await getSession()
  if (session.isLoggedIn) redirect("/")
  return (
    <div className="w-full h-full flex flex-row bg-sec">
      <div className="mx-auto flex flex-col gap-2 px-12 items-center justify-center dark:bg-pri-d">
        <p className="mb-10">futile</p>
        <LoginForm />
      </div>
    </div>
  )
}
