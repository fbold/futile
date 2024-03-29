"use client"
import { User } from "@prisma/client"
import clsx from "clsx"
import { useState } from "react"

type CategoriesListProps = {
  categories: User["categories"]
}

export default function CategoriesList({ categories }: CategoriesListProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [formShown, setFormShown] = useState(false)

  const handleCategorySelect = (cat: string) => {
    setSelected((c) => (c === cat ? null : cat))
  }

  const showForm = () => {
    setFormShown(true)
  }

  return (
    <div className="flex flex-row gap-4">
      <div>
        <p className="underline text-red-400">categories</p>
        <ul>
          {categories.map((cat) => (
            <li
              key={cat}
              className={clsx(
                "cursor-pointer",
                cat === selected && "text-red-400"
              )}
              onClick={() => handleCategorySelect(cat)}
            >
              {cat}
            </li>
          ))}
          <li
            className="underline cursor-pointer text-gray-400"
            onClick={showForm}
          >
            new
          </li>
        </ul>
      </div>
    </div>
  )
}
