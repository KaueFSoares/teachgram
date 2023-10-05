import { useContext, useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"
import NavbarContext from "../../context/NavbarContext"
import { useUser } from "../../service/user.service"
import { FriendList } from "../../interface/friends/FriendList"
import Loading from "../util/Loading"

const FriendModal = () => {
  const [ friendList, setFriendList ] = useState<FriendList>()
  const [ page, setPage ] = useState(0)

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" })
  const pageSize = isDesktop ? 4 : 9

  const { setShowFriendsModal } = useContext(NavbarContext)
  
  const user = useUser()

  useEffect(() => {
    user.getFriendList(page, pageSize).then((res) => {
      setFriendList(res)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ page ])

  const pages = () => {
    const pages = []
    
    if (friendList) {
      const pageNumbers = page === 0 ? [ 0, 1, 2 ] : page === friendList.totalPages - 1 ? [ page - 2, page - 1, page ] : [ page - 1, page, page + 1 ]
      
      for (let i = 0; i < friendList.totalPages; i++) {
        if (pageNumbers.includes(i)) {
          pages.push(
            <button 
              className={`border border-solid border-gray text-gray h-8 w-8 rounded-md flex justify-center items-center
                          ${page === i && "bg-orange text-white border-orange"}`}
              key={i}
              onClick={() => setPage(i)}
              disabled={page === i}
            >
              {i + 1}
            </button>,
          )
        }
      }
    }

    return pages
  }

  return friendList ? (
    <div className="fixed w-full h-screen bg-black/50 flex items-center justify-center flex-col top-0 left-0">
      <div className="w-full h-full bg-white p-12 flex flex-col items-center justify-between
                      lg:w-2/5 lg:h-auto lg:rounded-3xl lg:p-8
                      xl:w-1/3
                      2xl:w-1/4">
        <header className="w-full flex flex-col gap-6
                          lg:gap-2">
          <div className="flex justify-between lg:hidden">
            <button 
              className="h-full flex items-start"
              onClick={() => setShowFriendsModal(false)}
            >
              <img src="/icon/left_arrow.svg" alt="" className="w-5" />
            </button>

            <img src="/images/short_logo.svg" alt="" className="w-11" />
          </div>

          <div className="hidden justify-end w-full
                          lg:flex">
            <button
              onClick={() => setShowFriendsModal(false)}
            >
              <img src="/icon/orange_X.svg" alt="" className="w-5" />
            </button>
          </div>

          <div className="w-full flex">
            <h1 
              className="pb-2 text-xl font-bold text-gray-800 border-b-[3px] border-solid border-orange
                          lg:text-lg"
            >
              Amigos
            </h1>
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
                  <h1 className="text-base font-semibold
                                lg:text-sm">
                    {friend.username}
                  </h1>
                  <h2 
                    className="text-sm text-gray
                              lg:text-xs">
                    {friend.name}
                  </h2>
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
          <div className="w-full flex items-center justify-center gap-4">
            <button 
              onClick={() => setPage((prev) => (prev - 1 < 0 ? 0 : prev - 1))}
              disabled={page === 0}
              className="border border-solid border-gray h-8 w-8 rounded-md flex justify-center items-center"
            >
              <img src="/icon/gray_arrow.svg" alt="" />
            </button>

            {pages()}

            <button 
              onClick={() => setPage((prev) => (prev + 1 > friendList.totalPages - 1 ? prev : prev + 1))}
              disabled={page === friendList.totalPages - 1}
              className="border border-solid border-gray h-8 w-8 rounded-md flex justify-center items-center"
            >
              <img src="/icon/gray_arrow.svg" alt="" className="transform rotate-180" />
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
