import { HTMLProps } from "react"

interface Props extends HTMLProps<HTMLButtonElement>{
    text: string
    confirm: boolean
}

const ModalButton = ({ text, confirm, onClick }: Props) => {
  return (
    <button 
      className={`px-2 py-1  rounded-lg border-orange border border-solid text-base shadow-lg
                ${confirm ? "text-white bg-orange" : "text-orange rounded-lg"}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default ModalButton
