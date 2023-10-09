import { Dispatch, SetStateAction, createContext } from "react"

const ModalContext = createContext<{
  showFriendsModal: boolean
  setShowFriendsModal: Dispatch<SetStateAction<boolean>>
  showNewPostModal: boolean
  setShowNewPostModal: Dispatch<SetStateAction<boolean>>
  showSettingsModal: boolean
  setShowSettingsModal: Dispatch<SetStateAction<boolean>>
  showUpdatePostModal: boolean
  changeShowUpdatePostModal: (id: string) => void
  showDeletePostModal: boolean
  changeShowDeletePostModal: (id: string) => void
    }>({
      showFriendsModal: false,
      setShowFriendsModal: () => {},
      showNewPostModal: false,
      setShowNewPostModal: () => {},
      showSettingsModal: false,
      setShowSettingsModal: () => {},
      showUpdatePostModal: false,
      changeShowUpdatePostModal: () => {},
      showDeletePostModal: false,
      changeShowDeletePostModal: () => {},
    })

export default ModalContext
