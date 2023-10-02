import { useNavigate } from "react-router-dom"
import { useUser } from "../../service/user.service.ts"
import ModalButton from "./ModalButton.tsx"

interface Props {
    onCancel: () => void
}

const DeleteAccountModal = ({ onCancel }: Props) => {
  const user = useUser()
  const navigate = useNavigate()

  const onConfirm = () => {
    user.deleteUser()
    navigate("/login")
  }

  return (
    <div className="fixed w-full h-screen bg-black/40 flex items-center justify-center flex-col  top-0 left-0">
      <div className="w-4/5 bg-white rounded-[2rem] flex flex-col">
        <header className="flex items-center justify-center py-10 border-b-gray border-b border-solid">
          <h2
            className="text-2xl font-semibold"
          >
            Excluir conta
          </h2>
        </header>

        <main className="flex flex-col items-center justify-between gap-8 py-10">
          <p className="px-8 text-center text-base">
            Todos os seus dados serão excluídos.
          </p>

          <div className="flex gap-6 text-base font-semibold">
            <ModalButton text="Cancelar" confirm={false} onClick={() => onCancel()} />
            <ModalButton text="Confirmar" confirm onClick={() => onConfirm()}/>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DeleteAccountModal
