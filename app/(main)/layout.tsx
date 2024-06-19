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
      <main className="absolute bg-pri dark:bg-pri-d flex-grow h-full w-full flex items-center justify-center">
        {children}
      </main>
    </>
  )
}
