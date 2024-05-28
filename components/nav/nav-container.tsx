import OrbitalMenus from "@/components/nav/orbital-menus"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function NavContainer({}: // className,
{
  // className: string
}) {
  const session = await getSession()
  if (!session.isLoggedIn) redirect("/login")
  const user = await prisma.user.findUnique({
    where: { username: session.username },
  })
  if (!user) redirect("/login")
  const categories = user.categories.map((cat) => ({
    label: cat,
    value: cat,
  }))
  return (
    <nav className="fixed flex w-full h-full pointer-events-none z-50 bg-gradient-to-b overflow-x-clip">
      <OrbitalMenus categories={categories} />
    </nav>
  )
}
