import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { PostProfileData } from "../interface/profile/PostProfileData"
import { UserProfileData } from "../interface/profile/UserProfileData"
import NavbarContext from "../context/NavbarContext"
import Navbar from "../components/navbar/Navbar"

interface ProfilePageProps {
  incrementPage: () => void
  userPostsData: PostProfileData[]
  userProfileData: UserProfileData
}

const ProfilePage = ({ incrementPage, userPostsData, userProfileData }: ProfilePageProps) => {
  const navigate = useNavigate()

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" })

  const { setShowSettingsModal } = useContext(NavbarContext)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log("Intersecting")
        if ((entries.some((entry) => entry.isIntersecting)) && (userPostsData.length > 11)) {
          incrementPage()
          console.log("Incrementing")
        }
      },
      { threshold: 1 },
    )

    observer.observe(document.querySelector("#load-more") as Element)
    

    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [  ])

  return (
    <>
      <main className="relative w-full min-h-screen flex items-center justify-start flex-col lg:flex-row lg:pl-[30vw] pb-4 lg:items-start">
        <div className="flex flex-col gap-4                      
                        lg:w-3/4 lg:pt-12
                        2xl:w-3/5">
          <header className="w-full flex p-6 justify-between items-center lg:hidden">
            <button 
              className="flex items-center justify-center"
              onClick={() => navigate("/")}
            >
              <img src="/icon/left_arrow.svg" alt="" className="w-5" />
            </button>

            <button 
              className="flex items-center justify-center"
              onClick={() => setShowSettingsModal(true)}
            >
              <img src="/icon/navbar/config.svg" alt="" className="w-5" />
            </button>
          </header>

          <section className="flex flex-col items-center justify-start gap-4
                              lg:flex-row">
            <div className="w-2/5 overflow-hidden aspect-square flex items-center justify-center rounded-full mb-4
                            lg:w-1/3">
              <img src={userProfileData.photo} alt="" className="w-full" />
            </div>

            <div className="flex gap-4 flex-col lg:ml-8 lg:items-start">
              <h1 className="text-xl font-semibold">
                {userProfileData.name}
              </h1>

              <p className="text-base text-center text-gray mb-4">
                {userProfileData.bio}
              </p>
            </div>
          </section>

          <section className="w-1/2 flex items-center self-center justify-center mb-4">
            <div className="flex-grow flex items-center justify-center flex-col">
              <span className="text-base font-bold">
                {userProfileData.postsNumber}
              </span>
              <span className="text-base text-gray font-medium">
              Posts
              </span>
            </div>

            <div className="h-10 w-px bg-gray"></div>

            <div className="flex-grow flex items-center justify-center flex-col">
              <span className="text-base font-bold">
                {userProfileData.friendsNumber}
              </span>
              <span className="text-base text-gray font-medium">
              Amigos
              </span>
            </div>
          </section>

          <section className="w-full grid grid-cols-3 gap-1 flex-grow">
            {userPostsData.map((post) => {
              return (
                <div 
                  key={post.id}
                  className="flex items-center justify-center w-full aspect-square overflow-hidden"
                >
                  <img src={post.photo} alt="" className="min-w-full min-h-full object-cover" />
                </div>
              )
            })}
          </section>
          <div id="load-more" className="opacity-0 h-px w-2"></div>
        </div>

        { isDesktop && <Navbar /> }
      </main>
    </>
  )
}

export default ProfilePage
