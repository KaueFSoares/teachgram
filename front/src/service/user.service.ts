import { FriendList } from "../interface/friends/FriendList"
import { FriendListResponse } from "../interface/friends/response/FriendListResponse"
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

  const getFriendListFromApi = async (pageNumber: number) => {
    const friendListResponse = await api.get(URL.FRIENDS, {
      params: {
        page: pageNumber,
        size: 9,
      },
    })
      .catch((error) => {
        throw error
      })

    return friendListResponse.data as FriendListResponse
  }
  
  const getFriendList = async (pageNumber: number) => {
    const friendListResponse = await getFriendListFromApi(pageNumber)

    const friendList = {
      totalPages: friendListResponse.totalPages,
      totalElements: friendListResponse.totalElements,
      friends: friendListResponse.content.map((friend) => {
        return {
          id: friend.id,
          name: friend.name,
          email: friend.email,
          username: friend.username,
          photo: friend.photo,
        }
      }),
      number: friendListResponse.number,
      first: friendListResponse.first,
      last: friendListResponse.last,
      pageNumber: friendListResponse.number + 1,
    } as FriendList

    return friendList
  }

  return {
    getUserPhoto: getUserPhoto,
    getFriendList: getFriendList,
  }
}

