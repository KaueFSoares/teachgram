import { Outlet } from "react-router-dom"
import { useState } from "react"
import NavbarContext from "../context/NavbarContext"
import FriendModal from "../components/modal/FriendModal"
import NewPostModal from "../components/modal/NewPostModal"
import SettingsModal from "../components/modal/SettingsModal"

const RoutesBase = () => {
  const [ showFriendsModal, setShowFriendsModal ] = useState(false)
  const [ showNewPostModal, setShowNewPostModal ] = useState(false)
  const [ showSettingsModal, setShowSettingsModal ] = useState(false)
  
  return (
    <>
      <NavbarContext.Provider value={{
        showFriendsModal,
        setShowFriendsModal,
        showNewPostModal,
        setShowNewPostModal,
        showSettingsModal,
        setShowSettingsModal,
      }}>
        <Outlet />
        { showFriendsModal && <FriendModal /> }
        { showNewPostModal && <NewPostModal /> }
        { showSettingsModal && <SettingsModal /> }
      </NavbarContext.Provider>
    </>
  )
}

export default RoutesBase
