import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import ModalContext from "../../context/ModalContext.ts"
import RightImage from "../util/RightImage.tsx"
import { onLogout } from "../../service/auth.service.ts"
import AuthContext from "../../context/AuthContext.ts"
import DeleteAccountModal from "./DeleteAccountModal.tsx"
import AccountSettingsModal from "./AccountSettingsModal.tsx"
import ProfileSettingsModal from "./ProfileSettingsModal.tsx"

const SettingsModal = () => {
  const [ showDeleteModal, setShowDeleteModal ] = useState(false)
  const [ showAccountSettingsModal, setShowAccountSettingsModal ] = useState(false)
  const [ showProfileSettingsModal, setShowProfileSettingsModal ] = useState(false)

  const { t } = useTranslation()

  const { setShowSettingsModal } = useContext(ModalContext)
  const { setAuthenticated } = useContext(AuthContext)

  const handleOnLogout = () => {
    onLogout()
    setAuthenticated(false)
  }

  return (
    <div className="fixed w-full h-screen bg-black/50 flex items-center justify-center flex-col  top-0 left-0">
      <div className="relative w-full h-full bg-white p-12 flex flex-col items-center justify-start
                      lg:items-start">
        <div className="flex flex-col w-full 
                        lg:w-1/2 lg:pl-12
                        xl:w-1/3
                        2xl:w-[30%]">
          <header className="w-full flex mb-20">
            <button 
              className="h-full flex items-start"
              onClick={() => setShowSettingsModal(false)}
            >
              <img src="/icon/left_arrow.svg" alt="" className="w-5" />
            </button>
          </header>

          <main 
            className="w-full flex flex-col gap-12
            lg:px-16  
            xl:px-12"
          >
            <div 
              className="w-full flex items-center justify-between"
              role="button"
              onClick={() => setShowAccountSettingsModal(true)}
            >
              <p className="font-semibold text-xl">
                {t("settings.accountSettings")}
              </p>
            
              <img src="/icon/short_arrow.svg" alt="" />
            </div>

            <div 
              className="w-full flex items-center justify-between"
              role="button"
              onClick={() => setShowProfileSettingsModal(true)}
            >
              <p className="font-semibold text-xl">
                {t("settings.edit")}
              </p>
            
              <img src="/icon/short_arrow.svg" alt="" />
            </div>

            <p 
              className="underline text-lg text-orange"
              role="button"
              onClick={() => setShowDeleteModal(true)}
            >
              {t("settings.delete")}
            </p>

            <p 
              className="underline text-lg text-orange"
              role="button"
              onClick={() => handleOnLogout()}
            >
              {t("settings.logout")}
            </p>

            <p 
              className="underline text-lg text-orange"
              role="button"
              onClick={() => setShowDeleteModal(true)}
            >
              {t("settings.change_to_english")}
            </p>
          </main>
        </div>
        <RightImage />

        { showDeleteModal && <DeleteAccountModal onCancel={() => setShowDeleteModal(false)} />}
        { showAccountSettingsModal && <AccountSettingsModal onCancel={() => setShowAccountSettingsModal(false)} />}
        { showProfileSettingsModal && <ProfileSettingsModal onCancel={() => setShowProfileSettingsModal(false)} />}
      </div>
    </div>
  )
}

export default SettingsModal
