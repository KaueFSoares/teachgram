import { Dispatch, SetStateAction, createContext } from "react"
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
