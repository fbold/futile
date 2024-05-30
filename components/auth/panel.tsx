import LoginForm from "@/components/auth/login-form"

export default function LoginPanel() {
  return (
    <div className="w-full h-full flex flex-row bg-sec">
      <div className="mx-auto flex flex-col gap-2 px-12 items-center justify-center dark:bg-pri-d">
        <p className="mb-10">futile</p>
        <LoginForm />
      </div>
    </div>
  )
}
