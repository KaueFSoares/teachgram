import { SingleFriendProfileResponse } from "../interface/friend_profile/response/SingleFriendProfileResponse"
import { FriendList } from "../interface/friends/FriendList"
import { FriendListResponse } from "../interface/friends/response/FriendListResponse"
import { UserResponse } from "../interface/home/response/UserResponse"
import { UserProfileData } from "../interface/profile/UserProfileData"
import useApi from "./api/api"
import { URL } from "./api/url"
import { onLogout } from "./auth.service"


export const useUser = () => {
  const api = useApi()

  const getUserFromApi = async () => {
    const userReponse = await api.get(URL.USER)
      .catch((error) => {
        throw error
      })

    return userReponse.data as UserResponse
  }

  const getFriendListFromApi = async (pageNumber: number, pageSize: number) => {
    const friendListResponse = await api.get(URL.FRIENDS, {
      params: {
        page: pageNumber,
        size: pageSize,
      },
    })
      .catch((error) => {
        throw error
      })

    return friendListResponse.data as FriendListResponse
  }

  const getAnyUserFromApi = async (username: string) => {
    const friendResponse = await api.get(`${URL.USER}/any/${username}`)
      .catch((error) => {
        throw error
      })

    return friendResponse.data as SingleFriendProfileResponse
  }

  const getUserPhoto = async () => {
    const userData = await getUserFromApi()

    return userData.photo
  }
  
  const getFriendList = async (pageNumber: number, pageSize: number) => {
    const friendListResponse = await getFriendListFromApi(pageNumber, pageSize)

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

  const getFullUser = async () => {
    return await getUserFromApi()
  }

  const deleteUser = async () => {
    await api.delete(URL.USER)
      .catch((error) => {
        throw error
      })

    onLogout()
  }

  const updateAccountData = async (name: string, email: string, phone: string, password: string) => {
    const userResponse = await api.put(URL.USER, {
      name: name,
      email: email,
      phone: phone,
      password: password === "nopasswd" ? "" : password,
    })
      .catch((error) => {
        throw error
      })

    return userResponse.data as UserResponse
  }

  const updateProfileData = async (photo: string, name: string, username: string, bio: string) => {
    const userResponse = await api.put(URL.USER, {
      photo: photo,
      name: name,
      username: username,
      bio: bio,
    })
      .catch((error) => {
        throw error
      })

    return userResponse.data as UserResponse
  }

  const getProfileData = async () => {
    const userResponse = await getUserFromApi()

    return {
      photo: userResponse.photo,
      name: userResponse.name,
      bio: userResponse.bio,
      postsNumber: userResponse.postsCount,
      friendsNumber: userResponse.friendsCount,
    } as UserProfileData
  }

  const getProfileByUsername = async (username: string) => {
    const userResponse = await getAnyUserFromApi(username)

    return userResponse
  }

  return {
    getUserPhoto: getUserPhoto,
    getFriendList: getFriendList,
    deleteUser: deleteUser,
    getFullUser: getFullUser,
    updateAccountData: updateAccountData,
    updateProfileData: updateProfileData,
    getProfileData: getProfileData,
    getProfileByUsername: getProfileByUsername,
  }
}

