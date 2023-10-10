import { useContext, useEffect, useState } from "react"
import ModalContext from "../../context/ModalContext"
import usePosts from "../../service/post.service"
import Loading from "../util/Loading"
import { ModalInput } from "."

interface UpdatePostModalProps {
  id: string
}

const UpdatePostModal = ({ id }: UpdatePostModalProps) => {
  const [ loading, setLoading ] = useState(false)

  const [ description, setDescription ] = useState("")
  const [ link, setLink ] = useState("")

  const post = usePosts()

  const { changeShowUpdatePostModal } = useContext(ModalContext)
  
  useEffect(() => {
    setLoading(true)
    post.getSinglePost(id).then((res) => {
      setDescription(res.description)
      setLink(res.photoLink)
      setLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [  ])

  const updatePost = async () => {
    setLoading(true)
    if(description.length > 0){
      post.updatePost(id, link, description).then(() => {
        setLoading(false)
        changeShowUpdatePostModal("")
        window.location.reload()
      })
    } else {
      post.updatePost(id, link).then(() => {
        setLoading(false)
        changeShowUpdatePostModal("")
        window.location.reload()
      })
    }
  }

  return (
    loading ? (
      <Loading />
    ) : (
      <div className="fixed w-full h-screen bg-black/50 flex items-center justify-start flex-col top-0 left-0
                    lg:justify-center">
      
        <header className={`w-full p-7 bg-white flex gap-8
                            lg:w-2/5 lg:rounded-t-3xl
                            xl:w-1/3`}>
          <button
            className="flex justify-center items-center"
            onClick={() =>  changeShowUpdatePostModal("")}
          >
            <img src="/icon/orange_X.svg" alt="" className="w-4" />
          </button>

          <h2 className="flex-grow font-semibold text-xl">
            Editar publicação
          </h2>

          <button
            className="flex justify-center items-center"
            onClick={() => updatePost()}
          >
            <p className="text-base text-orange font-semibold underline">
              Salvar
            </p>
          </button>
        </header>
      
        
        <main className="w-full h-full bg-white flex flex-col gap-2
                          lg:mt-0 lg:shadow-none lg:rounded-b-3xl lg:rounded-t-none lg:w-2/5 lg:h-auto
                          xl:w-1/3">
          <img src={link} alt="" className="w-full lg:w-4/5 lg:self-center" />

          <div
            className="p-6"
          >
            <ModalInput 
              name=""
              type="text"
              state={description}
              setState={setDescription}
              placeholder="Escreva uma legenda..."
              border={false}
            />
          </div>
        </main>
      
      </div>
    )
  )
}

export default UpdatePostModal
