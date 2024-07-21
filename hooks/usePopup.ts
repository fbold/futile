import { useCallback, useState } from "react"

type UsePopupBaseProps<T> = {
  onOK: () => void
  onCancel?: () => void
  type: T
}

/** All of this is being handled separately. No point passing these things through
    the usePopup hook just to have it register them on the RequestPopup compoentn
    when its easier to do that ourselves in the component direcly
*/
// type UsePopupConditionalProps<T> = T extends "request"
//   ? {
//       success: boolean
//       loading: boolean
//       error: string | null
//     }
//   : {
//       success?: boolean
//       loading?: boolean
//       error?: string | null
//     }

type UsePopupProps<T> = UsePopupBaseProps<T> // & UsePopupConditionalProps<T>
type BaseReturn = {
  showPopup: () => any
  isUp: boolean
  register: {
    show: boolean
    onClose: () => any
    onOK: () => any
    onCancel: () => any
  }
}

type RequestReturn = BaseReturn // & {
//   register: {
//     loading: boolean
//     error: string
//   }
// }

type InformationReturn = BaseReturn

type UsePopupReturn<PopupType extends "information" | "request"> =
  PopupType extends "request" ? RequestReturn : InformationReturn

export default function usePopup<T extends "information" | "request">({
  onOK,
  onCancel,
  type,
}: // loading,
// success,
// error,
//
UsePopupProps<T>): UsePopupReturn<T> {
  const [popupShown, setPopupShown] = useState(false)
  // const Popup = dynamic(() => import("@/components/popups/empty"), {ssr: false})

  const showPopup = useCallback(() => {
    setPopupShown(true)
  }, [])

  const hidePopup = useCallback(() => {
    setPopupShown(false)
  }, [])

  const handleOK = useCallback(() => {
    if (type !== "request") setPopupShown(false)
    onOK()
  }, [onOK])

  // not needed as causing issues,
  // if (type === "request") {
  //   if (success && popupShown) setPopupShown(false)
  // }

  const handleCancel = useCallback(() => {
    setPopupShown(false)
    onCancel && onCancel()
  }, [onCancel])

  // if (type === "request")
  return {
    showPopup,
    isUp: popupShown,
    register: {
      show: popupShown,
      onClose: hidePopup,
      onOK: handleOK,
      onCancel: handleCancel,
      // loading: loading,
      // error: error,
    },
  } as UsePopupReturn<T>
}
