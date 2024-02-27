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
      <NavContainer className="sticky flex w-full h-12 z-50 bg-gradient-to-b" />
      <main className="bg-pri dark:bg-pri-d flex-grow h-[calc(100%-50px)] flex">
        <NextAuthProvider>{children}</NextAuthProvider>
      </main>
    </>
  )
}
