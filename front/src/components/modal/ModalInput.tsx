import { Dispatch, HTMLProps, SetStateAction } from "react"

interface Props extends HTMLProps<HTMLInputElement>{
  name: string
  type: string
  state: string
  setState: Dispatch<SetStateAction<string>>
  border?: boolean
}

const ModalInput = ({ name, type, state, setState, placeholder, border = true }: Props) => {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name} className="w-full text-base
                                        lg:text-sm">{name}</label>
      <input 
        type={type} 
        name={name} 
        id={name} 
        value={state}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
        className={`w-full outline-none py-1 text-base text-gray text-ellipsis
                    lg:text-sm
                    ${border && "border-b border-solid border-gray/50"}`}
      />
    </div>
  )
}

export default ModalInput
