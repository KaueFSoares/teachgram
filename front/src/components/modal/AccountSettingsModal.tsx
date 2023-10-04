import { useEffect, useState } from "react"
import RightImage from "../util/RightImage"
import { useUser } from "../../service/user.service"
import ModalButton from "./ModalButton"
import ModalInput from "./ModalInput"

interface Props {
  onCancel: () => void
}

const AccountSettingsModal = ({ onCancel }: Props) => {
  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ phone, setPhone ] = useState("")

  // server should not send the real password for the frontend
  const [ password, setPassword ] = useState("nopasswd")

  const user = useUser()

  useEffect(() => {
    user.getFullUser().then((res) => {
      setName(res.name)
      setEmail(res.email)
      setPhone(res.phone)
    })
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ])

  const handleUpdate = () => {
    // Update user data
  }

  return (
    <div className="fixed w-full h-screen bg-black/50 flex items-center justify-center flex-col top-0 left-0">
      <div className="w-full h-full bg-white px-12 py-24 flex flex-col justify-start">
        <div className="relative w-full flex flex-col gap-16 items-center
                        lg:w-1/2 lg:px-20 lg:gap-8 lg:justify-center lg:h-full
                        xl:w-1/3
                        2xl:w-[30%]">
          <div className="hidden absolute -top-12 left-0
                          lg:flex">
            <img 
              role="button" 
              src="/icon/left_arrow.svg" 
              alt="" 
              onClick={onCancel}
            />
          </div>

          <h2 className="w-full text-xl font-bold">
          Configurações da conta
          </h2>

          <div className="w-full flex flex-col gap-4 lg:gap-2">
            <ModalInput
              name="Nome"
              type="text"
              state={name}
              setState={setName}
            />
            <ModalInput
              name="Email"
              type="email"
              state={email}
              setState={setEmail}
            />
            <ModalInput
              name="Telefone"
              type="text"
              state={phone}
              setState={setPhone}
            />
            <ModalInput
              name="Senha"
              type="password"
              state={password}
              setState={setPassword}
            />
          </div>

          <div className="w-full flex gap-6 lg:hidden">
            <ModalButton 
              onClick={onCancel}
              text="Cancelar"
              confirm={false}
            />

            <ModalButton 
              onClick={handleUpdate}
              text="Atualizar"
              confirm={true}
            />
          </div>

          <div className="hidden lg:flex w-full items-start">
            <ModalButton
              onClick={handleUpdate}
              text="Salvar"
              confirm={true}
            />
          </div>
        </div>
        <RightImage />
      </div>
    </div>
  )
}

export default AccountSettingsModal
