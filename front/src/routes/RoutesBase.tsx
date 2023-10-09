import { Outlet } from "react-router-dom"
import { useState } from "react"
import NavbarContext from "../context/NavbarContext"
import FriendModal from "../components/modal/FriendModal"
import NewPostModal from "../components/modal/NewPostModal"
import SettingsModal from "../components/modal/SettingsModal"
import UpdatePostModal from "../components/modal/UpdatePostModal"

const RoutesBase = () => {
  const [ showFriendsModal, setShowFriendsModal ] = useState(false)
  const [ showNewPostModal, setShowNewPostModal ] = useState(false)
  const [ showSettingsModal, setShowSettingsModal ] = useState(false)
  const [ showUpdatePostModal, setShowUpdatePostModal ] = useState(false)

  const [ updatingPostId, setUpdatingPostId ] = useState("")

  const changeShowUpdatePostModal = ( id: string ) => {
    setUpdatingPostId(id)
    setShowUpdatePostModal((prev) => !prev)
  }
  
  return (
    <>
      <NavbarContext.Provider value={{
        showFriendsModal,
        setShowFriendsModal,
        showNewPostModal,
        setShowNewPostModal,
        showSettingsModal,
        setShowSettingsModal,
        showUpdatePostModal,
        changeShowUpdatePostModal,
      }}>
        <Outlet />
        { showFriendsModal && <FriendModal /> }
        { showNewPostModal && <NewPostModal /> }
        { showSettingsModal && <SettingsModal /> }
        { showUpdatePostModal && <UpdatePostModal id={updatingPostId} />}
      </NavbarContext.Provider>
    </>
  )
}

export default RoutesBase
