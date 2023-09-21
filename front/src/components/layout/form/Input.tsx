import { HTMLProps } from "react"

interface InputProps extends HTMLProps<HTMLInputElement>{
    name: string
    type: string
    placeholder: string
}

const Input = ({ name, type, placeholder, className }: InputProps) => {
  return (
    <div 
      className="flex flex-col w-full gap-2"
    >
      <label 
        htmlFor={name}
        className="text-base font-medium"
      >
        {name}
      </label>

      <input 
        type={type} 
        name={name} 
        id={name}
        placeholder={placeholder} 
        className={`border border-solid border-gray rounded-lg py-4 px-5 outline-orange ${className}`}
      />
    </div>
  )
}

export default Input
