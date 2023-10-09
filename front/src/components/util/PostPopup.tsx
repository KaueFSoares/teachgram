
const PostPopup = () => {
  return (
    <div className="bg-white shadow-full absolute -top-2 right-full py-4 px-6 rounded-xl flex flex-col gap-4">
      <button
        className="w-full text-center font-medium text-orange text-base"
      >
        Editar
      </button>

      <button
        className="w-full text-center font-medium text-orange text-base"
      >
        Excluir
      </button>
    </div>
  )
}

export default PostPopup
