import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { PostProfileData } from "../interface/profile/PostProfileData"
import { UserProfileData } from "../interface/profile/UserProfileData"
import NavbarContext from "../context/NavbarContext"

interface ProfilePageProps {
  incrementPage: () => void
  userPostsData: PostProfileData[]
  userProfileData: UserProfileData
}

const ProfilePage = ({ incrementPage, userPostsData, userProfileData }: ProfilePageProps) => {
  const navigate = useNavigate()

  const { setShowSettingsModal } = useContext(NavbarContext)

  return (
    <main className="relative w-full min-h-screen flex items-center justify-start flex-col gap-4">
      <header className="w-full flex p-6 justify-between items-center">
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

      <section className="flex flex-col items-center justify-start gap-4 mb-4">
        <div className="w-2/5 overflow-hidden aspect-square flex items-center justify-center rounded-full mb-4">
          <img src={userProfileData.photo} alt="" className="w-full" />
        </div>

        <h1 className="text-xl font-semibold">
          {userProfileData.name}
        </h1>

        <p className="text-base text-center text-gray mb-4">
          {userProfileData.bio}
        </p>

        <div className="w-1/2 flex items-center justify-center">
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
        </div>
      </section>

      <section className="w-full grid grid-cols-3 gap-1">
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

    </main>
  )
}

export default ProfilePage
