import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import ModalContext from "../../context/ModalContext"
import usePosts from "../../service/post.service"
import Loading from "../util/Loading"
import { ModalInput } from "."

const NewPostModal = () => {
  const [ loading, setLoading ] = useState(false)

  const [ link, setLink ] = useState("")
  const [ imageLoaded, setImageLoaded ] = useState(false)

  const [ firstScreen, setFirstScreen ] = useState(true)

  const [ description, setDescription ] = useState("")

  const navigate = useNavigate()

  const { setShowNewPostModal } = useContext(ModalContext)

  const { t } = useTranslation()

  const post = usePosts()

  useEffect(() => {
    try {
      if (link) {
        const img = new Image()
        img.src = link
  
        img.onload = () => {
          setImageLoaded(true)
        }
  
        img.onerror = () => {
          setImageLoaded(false)
        }
      } else {
        setImageLoaded(false)
      }
    } catch (err: unknown) { 
      setImageLoaded(false)
    }
  }, [ link ])

  const createPost = async () => {
    setLoading(true)
    if(description.length > 0){
      post.savePost(link, description).then(() => {
        setLoading(false)
        setShowNewPostModal(false)
        navigate("/")
        window.location.reload()
      })
    } else {
      post.savePost(link).then(() => {
        setLoading(false)
        setShowNewPostModal(false)
        navigate("/")
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
        { firstScreen ? (
          <header className={`w-full p-7 bg-white flex gap-8
                            lg:w-2/5 lg:rounded-t-3xl
                            xl:w-1/3
                            ${imageLoaded ? "" : "lg:flex-row-reverse"}`}>
            <button
              className="flex justify-center items-center"
              onClick={() => setShowNewPostModal(false)}
            >
              <img src="/icon/orange_X.svg" alt="" className="w-4" />
            </button>

            <h2 className="flex-grow font-semibold text-xl">
              {t("home.new_post.title")}
            </h2>

            <button
              className="flex justify-center items-center disabled:grayscale disabled:opacity-50 lg:disabled:hidden"
              onClick={() => setFirstScreen(false)}
              disabled={!imageLoaded}
            >
              <p className="text-base text-orange font-semibold underline">
                {t("home.new_post.next")}
              </p>
            </button>
          </header>
        ) : (
          <header className={`w-full p-7 bg-white flex gap-8
                            lg:w-2/5 lg:rounded-t-3xl
                            xl:w-1/3
                            ${imageLoaded ? "" : "lg:flex-row-reverse"}`}>
            <button
              className="flex justify-center items-center"
              onClick={() => setFirstScreen(true)}
            >
              <img src="/icon/left_arrow.svg" alt="" className="w-4" />
            </button>

            <h2 className="flex-grow font-semibold text-xl">
              {t("home.new_post.title")}
            </h2>

            <button
              className="flex justify-center items-center"
              onClick={() => createPost()}
            >
              <p className="text-base text-orange font-semibold underline">
                {t("home.new_post.share")}
              </p>
            </button>
          </header>
        )}

        { firstScreen ? (
          <main className="w-[calc(100%-6rem)] bg-white mt-12 shadow-full rounded-lg p-6 flex flex-col
                          lg:mt-0 lg:shadow-none lg:rounded-b-3xl lg:rounded-t-none lg:w-2/5 lg:gap-6
                          xl:w-1/3">
            <div className="flex flex-grow flex-col gap-2 lg:hidden">
              <h3 className="font-semibold text-xl">
                {t("home.new_post.image_link")}
              </h3>

          
              <ModalInput 
                name=""
                type="text"
                state={link}
                setState={setLink}
                placeholder={t("home.new_post.image_link_placeholder")}
                border={false}
              />
            </div>

            <div className="hidden w-full border-orange border border-solid rounded-lg overflow-hidden gap-4
                          lg:flex">
              <h3 className="text-sm whitespace-nowrap px-4 py-1 bg-orange text-white rounded-lg">
                {t("home.new_post.image_link")}
              </h3>
              <ModalInput 
                name=""
                type="text"
                state={link}
                setState={setLink}
                placeholder={t("home.new_post.image_link_placeholder")}
                border={false}
              />
            </div>

            {imageLoaded ? (
              <img src={imageLoaded ? link : ""} alt="Post image" className="w-full rounded-lg" />
            ) : (
              <>
                {link.length > 0 && (
                  <p className="text-red text-sm">
                    {t("home.new_post.invalid_link")}
                  </p>
                )}
              </>
            )}
          </main>
        ) : (
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
                placeholder={t("home.new_post.description_placeholder")}
                border={false}
              />
            </div>
          </main>
        )}
      </div>
    )
  )
}

export default NewPostModal
