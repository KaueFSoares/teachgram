interface ButtonProps {
  text: string
}

const Button = ({ text }: ButtonProps) => {
  return (
    <button 
      type="submit"
      className="bg-orange text-white font-semibold py-3 rounded-xl shadow-xl text-2xl"
    >
      {text}
    </button>
  )
}

export default Button
