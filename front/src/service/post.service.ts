import { Post } from "../interface/home/Post"
import { PostResponse } from "../interface/home/response/PostResponse"
import { PostProfileData } from "../interface/profile/PostProfileData"
import { OwnPostsResponse as ShortPostsResponse } from "../interface/profile/response/OwnPostsResponse"
import useApi from "./api/api"
import { URL } from "./api/url"

const usePosts = () => {
  const api = useApi()

  const getPostsFromApi = async (page: number) => {
    const postsResponse = await api.get(URL.POSTS, {
      params: {
        page: page,
        size: 4,
      },
    })
      .catch((error) => {
        throw error
      })
    
    return postsResponse.data as PostResponse
  }
  
  const getOwnPostsFromApi = async (page: number) => {
    const postsResponse = await api.get(URL.POSTS + URL.ME, {
      params: {
        page: page,
        size: 12,
      },
    })
      .catch((error) => {
        throw error
      })
    
    return postsResponse.data as ShortPostsResponse
  }

  const getFriendPostsFromApi = async (page: number, username: string) => {
    const postsResponse = await api.get(`${URL.FRIENDS_POSTS}/${username}`, {
      params: {
        page: page,
        size: 4,
      },
    })
      .catch((error) => {
        throw error
      })
    
    return postsResponse.data as ShortPostsResponse
  }

  const getPosts = async (page: number) => {
    const postsData = await getPostsFromApi(page)

    return postsData.content.map((post) => {
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
        createdAt: post.createdAt,
      }
    }) as Post[]
  }

  const savePost = async (image: string, description?: string) => {
    return await api.post(URL.POSTS, {
      description: description,
      photoLink: image,
    })
      .catch((error) => {
        throw error
      })
  }

  const getOwnPosts = async (page: number) => {
    const postsData = await getOwnPostsFromApi(page)

    return postsData.content.map((post) => {
      return {
        id: post.id,
        photo: post.photoLink,
      }
    }) as PostProfileData[]
  }

  const getFriendPosts = async (page: number, username: string) => {
    const postsData = await getFriendPostsFromApi(page, username)

    return postsData.content.map((post) => {
      return {
        id: post.id,
        photo: post.photoLink,
      }
    }) as PostProfileData[]
  }

  return {
    getPosts: getPosts,   
    savePost: savePost, 
    getOwnPosts: getOwnPosts,
    getFriendPosts: getFriendPosts,
  }
}

export default usePosts
