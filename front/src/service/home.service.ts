import { Dispatch, SetStateAction } from "react"
import { AuthData } from "../interface/AuthData"
import { PostList } from "../interface/home/PostList"
import { UserResponse } from "../interface/home/response/UserResponse"
import { User } from "../interface/home/User"
import { PostResponse } from "../interface/home/response/PostResponse"
import useApi from "./api/api"
import { URL } from "./api/url"

interface Props {
  authData: AuthData
  setAuthData: Dispatch<SetStateAction<AuthData>>
  setAuthenticated: Dispatch<SetStateAction<boolean>>
}

interface onLoad {
  userData: User
  posts: PostList
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

export const useHome = ({ authData, setAuthData, setAuthenticated }: Props) => {
  const api = useApi({
    authData: authData,
    setAuthData: setAuthData,
    setAuthenticated: setAuthenticated,
  })

  const getUser = async () => {
    const userReponse = await api.get(URL.USER)
      .catch((error) => {
        throw error
      })

    return userReponse.data as UserResponse
  }

  const getPosts = async () => {
    const postsResponse = await api.get(URL.POSTS)
      .catch((error) => {
        throw error
      })
    
    return postsResponse.data as PostResponse
  }
  

  const onLoad = async () => {
    const userData = await getUser()
    const postsData = await getPosts()


    return {
      userData: {
        photo: userData.photo,
      },
      posts: makePostList(postsData),
    } as onLoad
  }
  
  return {
    getHome: onLoad,
  }
}

