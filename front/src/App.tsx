import { useEffect, useState } from "react"
import AuthContext from "./context/AuthContext.tsx"
import AppRoutes from "./routes/AppRoutes.tsx"
import { useAuth } from "./service/auth.service.ts"
import { AuthData } from "./interface/AuthData.ts"

function App() {
  const auth = useAuth()
  const [ authenticated, setAuthenticated ] = useState(true)
  const [ authData, setAuthData ] = useState<AuthData>({} as AuthData)


  useEffect(() => {
    const data = auth.onLoad()

    if (data) {
      setAuthenticated(true)
      setAuthData(data)
    } else {
      setAuthenticated(false)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ])

  return (
    <AuthContext.Provider value={{ authenticated, authData, setAuthenticated, setAuthData }}>
      <AppRoutes authenticated={authenticated} />
    </AuthContext.Provider>
  )
}

export default App
