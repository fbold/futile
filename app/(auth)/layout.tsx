import { PropsWithChildren } from "react"

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className={`min-h-screen h-screen overflow-y-auto flex items-center`}>
      {children}
    </main>
  )
}
