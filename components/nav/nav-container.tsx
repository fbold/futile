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
    <nav className="fixed flex w-full h-full pointer-events-none z-50 bg-gradient-to-b overflow-x-clip">
      <OrbitalMenus
        categories={categories.map((cat) => ({
          label: cat.label,
          value: cat.id,
        }))}
      />
    </nav>
  )
}
