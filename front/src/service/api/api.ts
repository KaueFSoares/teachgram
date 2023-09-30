import { useContext } from "react"
import axios, { AxiosInstance } from "axios"
import { onRefresh } from "../auth.service"
import AuthContext from "../../context/AuthContext"
import { AuthData } from "../../interface/AuthData"
import { URL } from "./url"


const useApi = (): AxiosInstance => {
  const { setAuthenticated } = useContext(AuthContext)

  const authData = JSON.parse(localStorage.getItem("authData") as string) as AuthData

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

    await onRefresh(authData.refreshToken)
      .then((res) => {
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
