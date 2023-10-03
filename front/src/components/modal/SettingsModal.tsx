import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import NavbarContext from "../../context/NavbarContext.ts"
import RightImage from "../util/RightImage.tsx"
import DeleteAccountModal from "./DeleteAccountModal.tsx"

const SettingsModal = () => {
  const [ showDeleteModal, setShowDeleteModal ] = useState(false)

  const { t } = useTranslation()

  const { setShowSettingsModal } = useContext(NavbarContext)

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
            >
              <p className="font-semibold text-xl">
                {t("settings.accountSettings")}
              </p>
            
              <img src="/icon/short_arrow.svg" alt="" />
            </div>

            <div 
              className="w-full flex items-center justify-between"
              role="button"
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
          </main>
        </div>
        <RightImage />

        { showDeleteModal && <DeleteAccountModal onCancel={() => setShowDeleteModal(false)} />}
      </div>
    </div>
  )
}

export default SettingsModal
