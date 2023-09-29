import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "react-i18next"
import Input from "./Input.tsx"
import Button from "./Button.tsx"

interface Props {
  onClose: () => void
  onSubmit: () => void
  state: string
  setState: Dispatch<SetStateAction<string>>
}

const LinkModal = ({ onClose, onSubmit, state, setState }: Props) => {
  const { t } = useTranslation()

  return (
    <div className="absolute w-full h-full box-border flex flex-col items-center justify-start z-10 bg-white">
      <div className="w-full px-8 mb-4">
        <button
          type="button"
          onClick={() => onClose()}  
        >
          <img src="/icon/left_arrow.svg" className="w-5 h-5" alt="" />
        </button>
      </div>
      <div className="mb-24">
        <img src="/images/full_logo.svg" alt="" />
      </div>
      <div className="w-full px-12 mb-16">
        <h3 className="text-xl font-semibold">
          {t("signup.link.insertlink")}
        </h3>
      </div>
      <div className="px-12 w-full mb-12">
        <Input
          type="text"
          name={t("signup.link.link")}
          placeholder={t("signup.link.placeholder")}
          setState={setState}
          state={state}
        />
      </div>
      <div className="w-full px-12">
        <Button 
          text={t("signup.link.save")}
          type="button"
          onClick={onSubmit}
        />
      </div>
    </div>
  )
}

export default LinkModal
