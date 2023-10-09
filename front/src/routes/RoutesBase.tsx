import { Outlet } from "react-router-dom"
import { useState } from "react"
import ModalContext from "../context/ModalContext"
import { DeletePostModal, FriendModal, NewPostModal, SettingsModal, UpdatePostModal } from "../components/modal"

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
      <ModalContext.Provider value={{
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
      </ModalContext.Provider>
    </>
  )
}

export default RoutesBase
