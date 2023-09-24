import { Dispatch, SetStateAction } from "react"
import { AuthData } from "../interface/AuthData"
import useApi from "./api/api"
import { URL } from "./api/url"

interface Props {
  authData: AuthData
  setAuthData: Dispatch<SetStateAction<AuthData>>
  setAuthenticated: Dispatch<SetStateAction<boolean>>
}

export const useHome = ({ authData, setAuthData, setAuthenticated }: Props) => {
  const api = useApi({
    authData: authData,
    setAuthData: setAuthData,
    setAuthenticated: setAuthenticated,
  })

  const getHome = async () => {
    const response = await api.get(URL.USER)
      .catch((error) => {
        throw error
      })

    return response.data
  }
  
  return {
    getHome,
  }
}

