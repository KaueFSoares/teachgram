import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import ModalContext from "../../context/ModalContext"
import usePosts from "../../service/post.service"
import Loading from "../util/Loading"
import { ModalButton } from "."

interface DeletePostModalProps {
  id: string
}
const DeletePostModal = ({ id }: DeletePostModalProps) => {
  const [ loading, setLoading ] = useState(false)

  const { changeShowDeletePostModal } = useContext(ModalContext)

  const { t } = useTranslation()

  const post = usePosts()

  const deletePost = async () => {
    setLoading(true)
    post.deletePost(id).then(() => {
      setLoading(false)
      changeShowDeletePostModal(id)
      window.location.reload()
    })
  }

  return (
    loading ? (
      <Loading />
    ) : (
      <div className="fixed w-full h-screen bg-black/40 flex items-center justify-center flex-col  top-0 left-0">
        <div className="w-4/5 bg-white rounded-xl p-12 items-center flex flex-col shadow-full gap-8
                    lg:w-1/3
                    xl:w-1/4
                    2xl:w-1/5">
          <h2
            className="text-2xl font-semibold
                     lg:text-xl"
          >
            {t("home.delete_post.title")}
          </h2>

          <div className="flex gap-4">
            <ModalButton 
              text={t("home.delete_post.cancel")}
              confirm={false}
              onClick={() => changeShowDeletePostModal(id)}
            />

            <ModalButton 
              text={t("home.delete_post.confirm")}
              confirm
              onClick={deletePost}
            />
          </div>
        </div>
      </div>
    )
  )
}

export default DeletePostModal
