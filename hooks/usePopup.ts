import { useState } from "react"

// type UsePopupReturnType = {
//   showPopup: () => {},
//   regiter:
// }

export default function usePopup({ onOK }: { onOK: () => void }) {
  const [popupShown, setPopupShown] = useState(false)
  // const Popup = dynamic(() => import("@/components/popups/empty"), {ssr: false})

  const showPopup = () => {
    setPopupShown(true)
  }

  const hidePopup = () => {
    setPopupShown(false)
  }

  const handleOK = () => {
    setPopupShown(false)
    onOK()
  }

  return {
    showPopup,
    isUp: popupShown,
    register: {
      show: popupShown,
      onClose: hidePopup,
      onOK: handleOK,
      onCancel: hidePopup,
    },
  }
}
