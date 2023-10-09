import { useContext } from "react"
import NavbarContext from "../../context/NavbarContext"
import usePosts from "../../service/post.service"
import ModalButton from "./ModalButton"

interface DeletePostModalProps {
  id: string
}
const DeletePostModal = ({ id }: DeletePostModalProps) => {
  const { changeShowDeletePostModal } = useContext(NavbarContext)

  const post = usePosts()

  const deletePost = async () => {
    await post.deletePost(id)
    changeShowDeletePostModal(id)
  }

  return (
    <div className="fixed w-full h-screen bg-black/40 flex items-center justify-center flex-col  top-0 left-0">
      <div className="w-4/5 bg-white rounded-xl p-12 items-center flex flex-col shadow-full gap-8
                    lg:w-1/3
                    xl:w-1/4
                    2xl:w-1/5">
        <h2
          className="text-2xl font-semibold
                     lg:text-xl"
        >
            Excluir publicação?
        </h2>

        <div className="flex gap-4">
          <ModalButton 
            text="Cancelar"
            confirm={false}
            onClick={() => changeShowDeletePostModal(id)}
          />

          <ModalButton 
            text="Confirmar"
            confirm
            onClick={deletePost}
          />
        </div>
      </div>
    </div>
  )
}

export default DeletePostModal
