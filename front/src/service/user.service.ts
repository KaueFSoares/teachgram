import { UserResponse } from "../interface/home/response/UserResponse"
import useApi from "./api/api"
import { URL } from "./api/url"


export const useUser = () => {
  const api = useApi()

  const getUserFromApi = async () => {
    const userReponse = await api.get(URL.USER)
      .catch((error) => {
        throw error
      })

    return userReponse.data as UserResponse
  }


  const getUserPhoto = async () => {
    const userData = await getUserFromApi()

    return userData.photo
  }
  
  return {
    getUserPhoto: getUserPhoto,
  }
}

