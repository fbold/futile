"use client"
import { TextButton } from "@/components/buttons/text-button"
import Popup from "@/components/popups/empty"
import usePopup from "@/hooks/usePopup"
import { createCategory } from "@/lib/actions/categories"
import { CategorySchema, CategoryType } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category, User } from "@prisma/client"
import clsx from "clsx"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type CategoriesListProps = {
  categories: Category[]
}

export default function CategoriesList({ categories }: CategoriesListProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [formShown, setFormShown] = useState(false)
  const [newCategory, setNewCategory] = useState("")

  const {
    showPopup,
    isUp,
    register: registerPopup,
  } = usePopup({
    onOK: handleDel,
  })

  const { register, setValue, handleSubmit } = useForm<CategoryType>({
    resolver: zodResolver(CategorySchema),
  })

  const handleCategorySelect = (cat: string) => {
    setSelected((c) => (c === cat ? null : cat))
  }

  const handleDelClick = () => {
    // DELETE
    showPopup()
  }

  function handleDel() {
    // SEND DELETE REQ
    console.log("delete", selected)
  }

  const showForm = () => {
    setFormShown(true)
    setSelected(null)
  }

  const handleCancel = () => {
    setFormShown(false)
    setValue("label", "")
  }

  const onValid: SubmitHandler<CategoryType> = async (data) => {
    // POST NEW CATEGORY
    const result = await createCategory(data.label)
    if (result) console.log("created")
  }

  return (
    <div className="flex flex-col items-center text-center w-full">
      <Popup
        title={`Delete ${selected}?`}
        message="All fuTiles of this category will become uncategorized."
        {...registerPopup}
      />
      <p className="underline text-red-400">categories</p>
      <ul>
        {categories.map((cat) => (
          <li
            key={cat.id}
            className={clsx(
              "cursor-pointer",
              cat.id === selected && "line-through"
            )}
            onClick={() => handleCategorySelect(cat.id)}
          >
            {cat.label}
          </li>
        ))}
        {!formShown ? (
          <li className="flex gap-1 justify-center mt-1">
            {selected ? (
              <TextButton
                onClick={handleDelClick}
                className={clsx(
                  "text-r transition-opacity duration-300"
                  //  ? "opacity-100" : "opacity-0"
                )}
              >
                del
              </TextButton>
            ) : (
              <TextButton onClick={showForm} className="text-g">
                add category
              </TextButton>
            )}
          </li>
        ) : (
          <form onSubmit={handleSubmit(onValid)}>
            <input
              autoFocus
              className="border-none bg-transparent outline-none text-center"
              {...register("label")}
            ></input>
            <div className="flex gap-2 justify-center">
              <TextButton onClick={handleCancel}>cancel</TextButton>
              <TextButton className="!text-g">ok</TextButton>
            </div>
          </form>
        )}
      </ul>
      {/* </div> */}
    </div>
  )
}
