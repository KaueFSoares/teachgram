import { useContext, useEffect, useState } from "react"
import NavbarContext from "../../context/NavbarContext"
import { useUser } from "../../service/user.service"
import { FriendList } from "../../interface/friends/FriendList"
import Loading from "../util/Loading"

const FriendModal = () => {
  const [ friendList, setFriendList ] = useState<FriendList>()
  const [ page, setPage ] = useState(0)

  const { setShowFriendsModal } = useContext(NavbarContext)
  
  const user = useUser()

  useEffect(() => {
    user.getFriendList(page).then((res) => {
      setFriendList(res)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ page ])

  return friendList ? (
    <div className="fixed w-full h-screen bg-black/50 flex items-center justify-center flex-col top-0 left-0">
      <div className="w-full h-full bg-white p-12 flex flex-col items-center justify-between">
        <header className="w-full flex flex-col gap-6">
          <div className="flex justify-between">

            <button 
              className="h-full flex items-start"
              onClick={() => setShowFriendsModal(false)}
            >
              <img src="/icon/left_arrow.svg" alt="" className="w-5" />
            </button>

            <img src="/images/short_logo.svg" alt="" className="w-11" />

          </div>

          <div className="w-full flex">
            <h1 className="pb-2 text-xl font-bold text-gray-800 border-b-[3px] border-solid border-orange">Amigos</h1>
            <div className="border-b-2 border-solid border-gray/60 flex-grow" />
          </div>

        </header>

        <main className="flex-grow flex flex-col py-8">
          { friendList.friends.map((friend) => (
            <div 
              className="w-full flex items-center justify-between gap-4 py-2"
              key={friend.id}
            >
              <div className="flex-grow flex gap-4 items-center">
                <div className="w-1/5 aspect-square overflow-hidden flex items-center justify-center rounded-full">
                  <img src={friend.photo} alt="" className="w-full" />
                </div>

                <div>
                  <h1 className="text-base font-semibold">{friend.username}</h1>
                  <h2 className="text-sm text-gray">{friend.name}</h2>
                </div>
              </div>

              <button className="bg-orange rounded-lg text-white text-sm px-2 py-1 shadow-md">
                <p className="whitespace-nowrap">
                  Ver perfil
                </p>
              </button>              
                
            </div>
          ))}
        </main>

        <footer className="w-full px-4 py-2">
          <div className="w-full flex justify-center">
            <button 
              className="w-1/2 h-10 bg-orange rounded-xl text-white font-bold text-base"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Ver mais
            </button>
          </div>
        </footer>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default FriendModal
