"use client"
import { TextButton } from "@/components/buttons/text-button"
import { User } from "@prisma/client"
import clsx from "clsx"
import { useState } from "react"
import { useForm } from "react-hook-form"

type CategoriesListProps = {
  categories: User["categories"]
}

export default function CategoriesList({ categories }: CategoriesListProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [formShown, setFormShown] = useState(false)
  const [newCategory, setNewCategory] = useState("")

  const { register, setValue, handleSubmit } = useForm({})

  const handleCategorySelect = (cat: string) => {
    setSelected((c) => (c === cat ? null : cat))
  }

  const showForm = () => {
    setFormShown(true)
  }

  const handleCancel = () => {
    setFormShown(false)
    setValue("category", "")
  }

  const onValid = () => {
    // POST NEW CATEGORY
  }

  return (
    <div className="flex flex-col items-center text-center w-full">
      {/* <div> */}
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
        {!formShown ? (
          <li className="flex gap-1 justify-center">
            <TextButton onClick={showForm} className="text-g">
              new
            </TextButton>
            <TextButton
              onClick={() => {}}
              className={clsx(
                "text-r transition-opacity duration-300",
                selected ? "opacity-100" : "opacity-0"
              )}
            >
              del
            </TextButton>
          </li>
        ) : (
          <form onSubmit={handleSubmit(onValid)}>
            <input
              autoFocus
              className="border-none bg-transparent outline-none text-center"
              {...register("category")}
            ></input>
            <div className="flex gap-1 justify-evenly">
              {/* <TextButton>save</TextButton> */}
              <TextButton onClick={handleCancel}>cancel</TextButton>
            </div>
          </form>
        )}
      </ul>
      {/* </div> */}
    </div>
  )
}
