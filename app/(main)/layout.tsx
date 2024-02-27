import NextAuthProvider from "@/components/auth/next-auth-provider"
import NavContainer from "@/components/nav/nav-container"

type Props = {
  children?: JSX.Element
}

export default async function MainLayout({ children }: Props) {
  return (
    <>
      {/* This contains the orbital menus through another server-side component
    which retrieves the user's categories */}
      <NavContainer />
      <main className="bg-pri dark:bg-pri-d h-full flex-grow">
        <NextAuthProvider>{children}</NextAuthProvider>
      </main>
    </>
  )
}
