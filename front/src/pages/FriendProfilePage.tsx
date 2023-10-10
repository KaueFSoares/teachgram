import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { useTranslation } from "react-i18next"
import { SingleFriendProfileResponse } from "../interface/friend_profile/response/SingleFriendProfileResponse"
import { PostProfileData } from "../interface/profile/PostProfileData"
import Navbar from "../components/navbar/Navbar"

interface FriendProfilePageProps {
  incrementPage: () => void
  add: () => void
  remove: () => void
  isFriend: boolean
  friendData: SingleFriendProfileResponse
  postsData: PostProfileData[]
}

const FriendProfilePage = ({ incrementPage, friendData, postsData, add, remove, isFriend }: FriendProfilePageProps) => {
  const navigate = useNavigate()

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" })

  const { t } = useTranslation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if ((entries.some((entry) => entry.isIntersecting))) {
          incrementPage()
        }
      },
    )

    observer.observe(document.querySelector("#load-more-2") as Element)
    

    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [  ])

  return (
    <main className="relative w-full min-h-screen flex items-center justify-start flex-col lg:flex-row lg:pl-[30vw] pb-4 lg:items-start">
      <div className="flex flex-col gap-4                      
                    lg:w-3/4 lg:pt-12
                    2xl:w-3/5">
        <header className="w-full flex p-6 justify-between items-center lg:hidden">
          <button 
            className="flex items-center justify-center"
            onClick={() => navigate(-1)}
          >
            <img src="/icon/left_arrow.svg" alt="" className="w-5" />
          </button>
        </header>

        <section className="flex flex-col items-center justify-start gap-4
                              lg:flex-row">
          <div className="w-2/5 overflow-hidden aspect-square flex items-center justify-center rounded-full mb-4
                            lg:w-1/3">
            <img src={friendData.photo} alt="" className="w-full min-h-full object-cover" />
          </div>

          <div className="flex gap-4 flex-col lg:ml-8 lg:items-start">
            <h1 className="text-xl font-semibold text-center">
              {friendData.name}
            </h1>

            <p className="text-base text-center text-gray mb-4">
              {friendData.bio}
            </p>
          </div>
        </section>

        <section className="flex items-center self-center justify-center mb-4 gap-6">
          <div className="flex-grow flex items-center justify-center flex-col">
            <span className="text-base font-bold">
              {friendData.postsCount}
            </span>
            <span className="text-base text-gray font-medium">
              {t("home.profile.posts")}
            </span>
          </div>

          <div className="h-10 w-px bg-gray"></div>

          <div className="flex-grow flex items-center justify-center flex-col mr-4">
            <span className="text-base font-bold">
              {friendData.friendsCount}
            </span>
            <span className="text-base text-gray font-medium">
              {t("home.profile.friends")}
            </span>
          </div>

          <button 
            className={`px-2 py-1  rounded-lg  border border-solid text-base shadow-lg flex items-center justify-center gap-2
            ${isFriend ? "" : "text-white bg-orange border-orange"}`}

            onClick={isFriend ? remove : add}
          >
            {isFriend ? t("home.profile.friends"): t("home.profile.add")}
            {isFriend && <img src="/icon/gray_check.svg" alt="" className="w-3" />}
          </button>
        </section>
          
        <section className="w-full grid grid-cols-3 gap-1 flex-grow">
          {postsData.map((post) => {
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
        <div id="load-more-2" className="opacity-0 h-px w-2"></div>
      </div>

      { isDesktop && <Navbar />}
    </main>
  )
}

export default FriendProfilePage
