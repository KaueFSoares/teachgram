import axios, { AxiosInstance } from "axios"
import { URL } from "./url"

export const API = (): AxiosInstance => {
  return axios.create({
    baseURL: URL.BASE,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
}
