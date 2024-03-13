import { Icon as IconType } from "@tabler/icons-react"
import { Attributes, ChainedCommands, Editor } from "@tiptap/react"
import clsx from "clsx"

type BaseProps = {
  editor: Editor
  effectConditions: {} | string
  Icon: IconType
  group?: "left" | "right" | "middle"
}

type ConditionalProps =
  | {
      toggleEffect?: (e: ChainedCommands) => ChainedCommands
      setEffect?: never
      unsetEffect?: never
    }
  | {
      toggleEffect?: never
      setEffect?: (e: ChainedCommands) => ChainedCommands
      unsetEffect?: (e: ChainedCommands) => ChainedCommands
    }

export const EditorButton = ({
  editor,
  toggleEffect,
  setEffect,
  unsetEffect,
  effectConditions,
  Icon,
  group,
}: BaseProps & ConditionalProps) => {
  const isActive = () => editor.isActive(effectConditions)

  const handleClick = () => {
    console.log(toggleEffect)
    if (toggleEffect) toggleEffect(editor.chain().focus()).run()
    // const active = isActive()
    if (!setEffect || !unsetEffect) return
    if (isActive()) unsetEffect(editor.chain().focus()).run()
    else setEffect(editor.chain().focus()).run()
  }

  return (
    <button
      className={clsx(
        "p-1 border-acc dark:border-acc-d border-y aspect-square h-full ",
        // {
        //   'rounded-l-md': group === 'left',
        //   'rounded-r-md border-l': group === 'right',
        //   'rounded-none border-l': group === 'middle',
        //   'rounded-md': !group,
        // },
        !group && "border-x",
        group === "left" && "border-l",
        group === "right" && "border-l border-r",
        group === "middle" && "border-l",
        isActive() ? "bg-sec dark:bg-sec-d" : ""
      )}
      onClick={handleClick}
    >
      <Icon className="text-txt-pri dark:text-txt-pri-d m-auto" />
    </button>
  )
}
