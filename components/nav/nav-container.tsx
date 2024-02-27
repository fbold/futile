import OrbitalMenus from "@/components/nav/orbital-menus"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function NavContainer() {
  const session = await auth()
  const user = await prisma.user.findUnique({ where: { id: session?.user.id } })
  if (!user) redirect("/login")
  const categories = user.categories.map((cat) => ({
    label: cat,
    value: cat,
  }))
  return (
    <nav className="sticky flex w-full h-12 z-50 bg-gradient-to-b">
      <OrbitalMenus categories={categories} />
    </nav>
  )
}
