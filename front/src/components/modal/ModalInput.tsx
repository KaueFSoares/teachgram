import { Dispatch, HTMLProps, SetStateAction } from "react"

interface Props extends HTMLProps<HTMLInputElement>{
  name: string
  type: string
  state: string
  setState: Dispatch<SetStateAction<string>>
}

const ModalInput = ({ name, type, state, setState }: Props) => {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name} className="w-full text-base">{name}</label>
      <input 
        type={type} 
        name={name} 
        id={name} 
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="w-full border-b border-solid border-gray/50 outline-none py-1 text-base text-gray"
      />
    </div>
  )
}

export default ModalInput
