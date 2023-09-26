import { Dispatch, SetStateAction } from "react"
import { AuthData } from "../interface/AuthData"
import { PostList } from "../interface/home/PostList"
import { PostResponse } from "../interface/home/response/PostResponse"
import { UserResponse } from "../interface/home/response/UserResponse"
import useApi from "./api/api"
import { URL } from "./api/url"

interface Props {
  authData: AuthData
  setAuthData: Dispatch<SetStateAction<AuthData>>
  setAuthenticated: Dispatch<SetStateAction<boolean>>
}

const makePostList = (postsResponse: PostResponse) => {
  return {
    posts: postsResponse.content.map((post) => {
      return {
        id: post.id,
        title: post.title,
        description: post.description,
        photoLink: post.photoLink,
        videoLink: post.videoLink,
        likes: post.likes,
        privatePost: post.privatePost,
        userId: post.userId,
        username: post.username,
        userPhotoLink: post.userPhotoLink,
      }
    }),
    page: postsResponse.pageable.pageNumber,
    size: postsResponse.pageable.pageSize,
    totalPages: postsResponse.totalPages,
    totalPosts: postsResponse.totalElements,
    first: postsResponse.first,
    last: postsResponse.last,
  }
}

export const useUser = ({ authData, setAuthData, setAuthenticated }: Props) => {
  const api = useApi({
    authData: authData,
    setAuthData: setAuthData,
    setAuthenticated: setAuthenticated,
  })

  const getUserFromApi = async () => {
    const userReponse = await api.get(URL.USER)
      .catch((error) => {
        throw error
      })

    return userReponse.data as UserResponse
  }

  const getPostsFromApi = async () => {
    const postsResponse = await api.get(URL.POSTS)
      .catch((error) => {
        throw error
      })
    
    return postsResponse.data as PostResponse
  }

  const getPostList = async () => {
    const postsData = await getPostsFromApi()

    return makePostList(postsData) as PostList
  }

  const getUserPhoto = async () => {
    const userData = await getUserFromApi()

    return userData.photo
  }
  
  return {
    getPostList: getPostList,
    getUserPhoto: getUserPhoto,
  }
}

