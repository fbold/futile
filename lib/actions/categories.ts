"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export const createCategory = async (category: string) => {
  const session = await auth()
  if (!session) return false

  const createdCategory = await prisma.category.create({
    data: {
      user_id: session.user.id,
      label: category,
      private: false,
    },
  })

  return createdCategory
}

export const deleteCategory = async (categoryId: string) => {
  try {
    const session = await auth()
    if (!session) return false

    const deletedCategory = await prisma.category.delete({
      where: {
        user_id: session.user.id,
        id: categoryId,
      },
    })

    return deletedCategory
  } catch (e) {
    console.error(e)
    return false
  }
}
