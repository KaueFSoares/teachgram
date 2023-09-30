import axios, { AxiosInstance } from "axios"
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


