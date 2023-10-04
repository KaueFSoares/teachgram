import { useEffect, useState } from "react"
import RightImage from "../util/RightImage"
import { useUser } from "../../service/user.service"
import ModalButton from "./ModalButton"
import ModalInput from "./ModalInput"

interface Props {
  onCancel: () => void
}

const AccountSettingsModal = ({ onCancel }: Props) => {
  const [ photo, setPhoto ] = useState("")
  const [ name, setName ] = useState("")
  const [ username, setUsername ] = useState("")
  const [ bio, setBio ] = useState("")
  

  const user = useUser()

  useEffect(() => {
    user.getFullUser().then((res) => {
      setPhoto(res.photo)
      setName(res.name)
      setUsername(res.username)
      setBio(res.bio)
    })
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ])

  const handleUpdate = () => {
    user.updateProfileData(photo, name, username, bio).then(() => {
      onCancel()
    })
  }

  return (
    <div className="fixed w-full bg-black/50 top-0 left-0">
      <div className="w-full bg-white px-12 py-24">
        <div className="relative w-full flex flex-col gap-12
                        lg:w-1/2 lg:px-20 lg:gap-8
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

          <h2 className="w-full text-xl font-bold
                        lg:text-lg">
            Editar perfil
          </h2>

          <div className="w-full flex items-center justify-center">
            <div className="w-[55%] overflow-hidden flex items-center justify-center aspect-square rounded-full
                            lg:w-2/5">
              <img src={photo} alt="" className="min-w-full min-h-full" />
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 lg:gap-2">
            <ModalInput
              name="Foto de perfil"
              type="text"
              state={photo}
              setState={setPhoto}
            />
            <ModalInput
              name="Nome"
              type="text"
              state={name}
              setState={setName}
            />
            <ModalInput
              name="Nome de usuário"
              type="text"
              state={username}
              setState={setUsername}
            />
            <ModalInput
              name="Bio"
              type="text"
              state={bio}
              setState={setBio}
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
