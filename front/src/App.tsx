import { useEffect, useState } from "react"
import AuthContext from "./context/AuthContext.ts"
import AppRoutes from "./routes/AppRoutes.tsx"
import { onLoad } from "./service/auth.service.ts"
import NavbarContext from "./context/NavbarContext.ts"
import FriendModal from "./components/modal/FriendModal.tsx"
import SettingsModal from "./components/modal/SettingsModal.tsx"
import NewPostModal from "./components/modal/NewPostModal.tsx"

function App() {
  const [ authenticated, setAuthenticated ] = useState(true)

  const [ showFriendsModal, setShowFriendsModal ] = useState(false)
  const [ showNewPostModal, setShowNewPostModal ] = useState(false)
  const [ showSettingsModal, setShowSettingsModal ] = useState(false)


  useEffect(() => {
    const data = onLoad()

    if (data) {
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ])

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>

      <NavbarContext.Provider value={{
        showFriendsModal,
        setShowFriendsModal,
        showNewPostModal,
        setShowNewPostModal,
        showSettingsModal,
        setShowSettingsModal,
      }}>

        <AppRoutes authenticated={authenticated} />
        { showFriendsModal && <FriendModal /> }
        { showNewPostModal && <NewPostModal /> }
        { showSettingsModal && <SettingsModal /> }

      </NavbarContext.Provider>

    </AuthContext.Provider>
  )
}

export default App
