
interface MessageProps {
  text: string
}

const Message = ({ text } : MessageProps) => {
  return (
    <div className="w-full flex justify-end items-center gap-2 ">
      <img src="/icon/ball.svg" alt="" />
      <p className="text-orange font-semibold text-lg">
        {text}
      </p>
    </div>
  )
}

export default Message
