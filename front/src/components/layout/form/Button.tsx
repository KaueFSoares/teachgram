interface ButtonProps {
  text: string
}

const Button = ({ text }: ButtonProps) => {
  return (
    <button 
      type="submit"
      className="bg-orange text-white font-semibold py-3 rounded-xl shadow-full text-2xl
                  lg:text-xl lg:py-2"
    >
      {text}
    </button>
  )
}

export default Button
