import axios, { AxiosInstance } from "axios"
import { Dispatch, SetStateAction } from "react"
import { useAuth } from "../auth.service"
import { AuthData } from "../../interface/AuthData"
import { URL } from "./url"

export const OPENED_API = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: URL.BASE,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })

  return instance
}

interface Props {
  authData: AuthData
  setAuthData: Dispatch<SetStateAction<AuthData>>
  setAuthenticated: Dispatch<SetStateAction<boolean>>
}

const useApi = ({ authData, setAuthData, setAuthenticated }: Props): AxiosInstance => {
  const auth = useAuth()

  const instance = axios.create({
    baseURL: URL.BASE,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })

  instance.interceptors.request.use(async (req) => {
    const isExpired = new Date(authData.accessTokenExpiresAt) < new Date()

    if (!isExpired){
      req.headers.Authorization = `${authData.tokenType} ${authData.accessToken}`
      
      return req
    } 

    // eslint-disable-next-line no-console
    console.log("Token expired, refreshing...")

    await auth.onRefresh(authData.refreshToken)
      .then((res) => {
        setAuthData(res)

        req.headers.Authorization = `${authData.tokenType} ${res.accessToken}`
      })
      .catch((err) => {
      // eslint-disable-next-line no-console
        console.log(err)
        setAuthenticated(false)
      })

    return req
  })

  return instance
}

export default useApi
