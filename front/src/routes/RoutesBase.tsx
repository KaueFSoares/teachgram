import { Outlet } from "react-router-dom"
import { useState } from "react"
import NavbarContext from "../context/NavbarContext"
import FriendModal from "../components/modal/FriendModal"
import NewPostModal from "../components/modal/NewPostModal"
import SettingsModal from "../components/modal/SettingsModal"
import UpdatePostModal from "../components/modal/UpdatePostModal"
import DeletePostModal from "../components/modal/DeletePostModal"

const RoutesBase = () => {
  const [ showFriendsModal, setShowFriendsModal ] = useState(false)
  const [ showNewPostModal, setShowNewPostModal ] = useState(false)
  const [ showSettingsModal, setShowSettingsModal ] = useState(false)
  const [ showUpdatePostModal, setShowUpdatePostModal ] = useState(false)
  const [ showDeletePostModal, setShowDeletePostModal ] = useState(false)

  const [ postId, setPostId ] = useState("")

  const changeShowUpdatePostModal = ( id: string ) => {
    setPostId(id)
    setShowUpdatePostModal((prev) => !prev)
  }

  const changeShowDeletePostModal = ( id: string ) => {
    setPostId(id)
    setShowDeletePostModal((prev) => !prev)
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
        showDeletePostModal,
        changeShowDeletePostModal,
      }}>
        <Outlet />
        { showFriendsModal && <FriendModal /> }
        { showNewPostModal && <NewPostModal /> }
        { showSettingsModal && <SettingsModal /> }
        { showUpdatePostModal && <UpdatePostModal id={postId} />}
        { showDeletePostModal && <DeletePostModal id={postId} /> }
      </NavbarContext.Provider>
    </>
  )
}

export default RoutesBase
