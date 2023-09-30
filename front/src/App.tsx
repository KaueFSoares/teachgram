import { useEffect, useState } from "react"
import AuthContext from "./context/AuthContext.tsx"
import AppRoutes from "./routes/AppRoutes.tsx"
import { onLoad } from "./service/auth.service.ts"

function App() {
  const [ authenticated, setAuthenticated ] = useState(true)


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
      <AppRoutes authenticated={authenticated} />
    </AuthContext.Provider>
  )
}

export default App
