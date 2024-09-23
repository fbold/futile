import NavContainer from "@/components/nav/nav-container"
import npmPackage from "@/package.json"
type Props = {
  children?: JSX.Element
}

export default async function MainLayout({ children }: Props) {
  return (
    <>
      {/* This contains the orbital menus through another server-side component
    which retrieves the user's categories */}
      <NavContainer />
      <main className="flex-grow h-full w-full overflow-x-clip overflow-y-scroll flex items-center justify-center">
        {children}
        <p className="font-mono absolute rotate-90 text-text right-full translate-x-1/2 bottom-40 origin-bottom-left hover:translate-x-full delay-500 hover:delay-0 transition-transform pt-6">
          ({npmPackage.version})
        </p>
      </main>
    </>
  )
}
