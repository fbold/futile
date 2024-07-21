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
  if (!categories) redirect("/login")

  return (
    <nav className="fixed flex w-full h-full pointer-events-none overflow-x-clip">
      <div className="top-0 w-full h-[4.2rem] bg-gradient-to-b from-pri via-60% via-pri to-transparent pointer-events-none"></div>
      <OrbitalMenus
        categories={categories.map((cat) => ({
          label: cat.label,
          value: cat.id,
        }))}
      />
    </nav>
  )
}
