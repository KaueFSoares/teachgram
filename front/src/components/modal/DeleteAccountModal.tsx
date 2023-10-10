import { useNavigate } from "react-router-dom"
import { t } from "i18next"
import { useState } from "react"
import { useUser } from "../../service/user.service.ts"
import Loading from "../util/Loading.tsx"
import ModalButton from "./ModalButton.tsx"

interface Props {
    onCancel: () => void
}

const DeleteAccountModal = ({ onCancel }: Props) => {
  const [ loading, setLoading ] = useState(false)

  const user = useUser()
  const navigate = useNavigate()

  const onConfirm = () => {
    setLoading(true)
    user.deleteUser().then(() => {
      setLoading(false)
      navigate("/login")
    })
  }

  return (
    loading ? (
      <Loading />
    ) : (
      <div className="fixed w-full h-screen bg-black/40 flex items-center justify-center flex-col  top-0 left-0">
        <div className="w-4/5 bg-white rounded-[2rem] flex flex-col
                      lg:w-2/5
                      xl:w-1/3
                      2xl:w-1/4">
          <header className="flex items-center justify-center py-10 border-b-gray border-b border-solid
                            lg:justify-start lg:py-6 lg:px-8">
            <h2
              className="text-2xl font-semibold
                       lg:text-xl"
            >
              {t("settings.delete_modal.delete")}
            </h2>
          </header>

          <main className="flex flex-col items-center justify-between gap-8 py-10
                          lg:items-start lg:py-6">
            <p className="px-8 text-center text-base">
              {t("settings.delete_modal.alert")}
            </p>

            <div className="flex gap-6 text-base font-semibold
                          lg:justify-center lg:w-full">
              <ModalButton text={t("settings.delete_modal.cancel")} confirm={false} onClick={() => onCancel()} />
              <ModalButton text={t("settings.delete_modal.confirm")} confirm onClick={() => onConfirm()}/>
            </div>
          </main>
        </div>
      </div>
    )
  )
}

export default DeleteAccountModal
