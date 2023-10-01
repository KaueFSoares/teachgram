import { Dispatch, SetStateAction, createContext } from "react"

const NavbarContext = createContext<{
  showFriendsModal: boolean
  setShowFriendsModal: Dispatch<SetStateAction<boolean>>
  showNewPostModal: boolean
  setShowNewPostModal: Dispatch<SetStateAction<boolean>>
  showSettingsModal: boolean
  setShowSettingsModal: Dispatch<SetStateAction<boolean>>
}>({
  showFriendsModal: false,
  setShowFriendsModal: () => {},
  showNewPostModal: false,
  setShowNewPostModal: () => {},
  showSettingsModal: false,
  setShowSettingsModal: () => {},
})

export default NavbarContext
