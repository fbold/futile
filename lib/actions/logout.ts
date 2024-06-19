"use server"

import { killSession } from "@/lib/session"
import { redirect } from "next/navigation"

export const logout = async () => {
  await killSession()
  return redirect("/login")
}
