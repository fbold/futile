import RegisterForm from "@/components/auth/register-form"

export default function Register() {
  return (
    <div className="w-full h-full flex flex-row bg-sec">
      <div className="mx-auto flex flex-col gap-2 px-12 items-center justify-center dark:bg-pri-d">
        <RegisterForm />
      </div>
    </div>
  )
}
