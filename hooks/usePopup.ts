import { useCallback, useState } from "react"

// type UsePopupReturnType = {
//   showPopup: () => {},
//   regiter:
// }

export default function usePopup({
  onOK,
  onCancel,
}: {
  onOK: () => void
  onCancel?: () => void
}) {
  const [popupShown, setPopupShown] = useState(false)
  // const Popup = dynamic(() => import("@/components/popups/empty"), {ssr: false})

  const showPopup = useCallback(() => {
    setPopupShown(true)
  }, [])

  const hidePopup = useCallback(() => {
    setPopupShown(false)
  }, [])

  const handleOK = useCallback(() => {
    setPopupShown(false)
    onOK()
  }, [onOK])

  const handleCancel = useCallback(() => {
    setPopupShown(false)
    onCancel && onCancel()
  }, [onCancel])

  return {
    showPopup,
    isUp: popupShown,
    register: {
      show: popupShown,
      onClose: hidePopup,
      onOK: handleOK,
      onCancel: handleCancel,
    },
  }
}
