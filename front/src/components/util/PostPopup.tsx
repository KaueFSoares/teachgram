import { useContext } from "react"
import { useTranslation } from "react-i18next"
import ModalContext from "../../context/ModalContext"

interface PostPopupProps {
  id: string
}

const PostPopup = ({ id }: PostPopupProps) => {
  const { changeShowDeletePostModal, changeShowUpdatePostModal } = useContext(ModalContext)

  const { t } = useTranslation()
  
  return (
    <div className="bg-white shadow-full absolute -top-2 right-full py-4 px-6 rounded-xl flex flex-col gap-4">
      <button
        className="w-full text-center font-medium text-orange text-base"
        onClick={() => changeShowUpdatePostModal(id)}
      >
        {t("home.post_popup.edit")}
      </button>

      <button
        className="w-full text-center font-medium text-orange text-base"
        onClick={() => changeShowDeletePostModal(id)}
      >
        {t("home.post_popup.delete")}
      </button>
    </div>
  )
}

export default PostPopup
