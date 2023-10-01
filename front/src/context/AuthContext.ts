import { Dispatch, SetStateAction, createContext } from "react"

const AuthContext = createContext<{
  authenticated: boolean
  setAuthenticated: Dispatch<SetStateAction<boolean>>
}>({
  authenticated: false,
  setAuthenticated: () => {},
})

export default AuthContext
