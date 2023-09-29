import { HTMLProps } from "react"

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  text: string
  type: "submit" | "button" | "reset"
}

const Button = ({ text, onClick, type = "submit" }: ButtonProps) => {
  return (
    <button 
      onClick={onClick}
      type={type}
      className="bg-orange text-white font-semibold py-3 rounded-xl shadow-full text-2xl w-full
                  lg:text-xl lg:py-2"
    >
      {text}
    </button>
  )
}

export default Button
