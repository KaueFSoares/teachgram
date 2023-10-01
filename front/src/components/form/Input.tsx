import { Dispatch, HTMLProps, SetStateAction } from "react"

interface InputProps extends HTMLProps<HTMLInputElement>{
    name: string
    type: string
    placeholder: string
    state: string
    setState: Dispatch<SetStateAction<string>>
}

const Input = ({ name, type, placeholder, className, state, setState, maxLength }: InputProps) => {
  return (
    <div 
      className="flex flex-col w-full gap-2"
    >
      <label 
        htmlFor={name}
        className="text-base font-medium
                  lg:text-sm"
      >
        {name}
      </label>

      <input 
        onChange={(e) => setState(e.target.value)}
        value={state}
        type={type} 
        name={name} 
        id={name}
        maxLength={maxLength}
        placeholder={placeholder} 
        className={`border border-solid border-gray rounded-lg py-4 px-5 outline-orange ${className}
                    lg:py-2 lg:px-4`}
      />
    </div>
  )
}

export default Input
