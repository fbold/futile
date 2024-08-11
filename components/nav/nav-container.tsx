import OrbitalMenus from "@/components/nav/orbital-menus"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function NavContainer() {
  const session = await getSession()
  if (!session.user) redirect("/login")
  const categories = await prisma.category.findMany({
    where: { user_id: session.user.id },
  })

  return (
    <nav className="fixed z-30 w-full h-full pointer-events-none overflow-x-clip">
      <div className="fixed top-0 w-full h-[4.2rem] bg-gradient-smooth-linear-to-b pointer-events-none"></div>
      <OrbitalMenus categories={categories} />
      <div className="-z-10 fixed bottom-0 w-full h-[4.2rem] bg-gradient-smooth-linear-to-t pointer-events-none"></div>
    </nav>
  )
}
