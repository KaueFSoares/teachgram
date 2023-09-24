import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react"
import { AuthData } from "../interface/AuthData"

const AuthContext = createContext<{
  authenticated: boolean
  authData: AuthData
  setAuthenticated: Dispatch<SetStateAction<boolean>>
  setAuthData: Dispatch<SetStateAction<AuthData>>
}>({
  authenticated: false,
  authData: {} as AuthData,
  setAuthenticated: () => {},
  setAuthData: () => {},
})

export default AuthContext

export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [ authenticated, setAuthenticated ] = useState(false)
  const [ authData, setAuthData ] = useState<AuthData>({} as AuthData)

  return (
    <AuthContext.Provider value={{ authenticated, authData, setAuthenticated, setAuthData }}>
      {children}
    </AuthContext.Provider>
  )
}
