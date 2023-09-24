import axios, { AxiosInstance } from "axios"
import { useContext } from "react"
import AuthContext from "../../context/AuthContext"
import { useAuth } from "../auth.service"
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

const useApi = (): AxiosInstance => {
  const { authData, setAuthData } = useContext(AuthContext)

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

    if (!isExpired) return req

    const newData = await auth.onRefresh(authData.refreshToken)

    setAuthData(newData)

    req.headers.Authorization = `Bearer ${newData.accessToken}`

    return req
  })

  return instance
}

export default useApi
