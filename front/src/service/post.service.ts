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

  const getPostFromApi = async (id: string) => {
    const postResponse = await api.get(`${URL.POSTS}${URL.ME}/${id}`)
      .catch((error) => {
        throw error
      })
    
    return postResponse.data as Post
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

  const updatePost = async (id: string, image: string, description?: string) => {
    const response = await api.put(`${URL.POSTS}/${id}`, {
      description: description,
      photoLink: image,
    })
      .catch((error) => {
        throw error
      })

    return response.data as Post
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

  const getSinglePost = async (id: string) => {
    const postData = await getPostFromApi(id)

    return {
      id: postData.id,
      title: postData.title,
      description: postData.description,
      photoLink: postData.photoLink,
      videoLink: postData.videoLink,
      likes: postData.likes,
      privatePost: postData.privatePost,
      userId: postData.userId,
      username: postData.username,
      userPhotoLink: postData.userPhotoLink,
      createdAt: postData.createdAt,
    } as Post
  }

  return {
    getPosts: getPosts,   
    savePost: savePost, 
    getOwnPosts: getOwnPosts,
    getFriendPosts: getFriendPosts,
    getSinglePost: getSinglePost,
    updatePost: updatePost,
  }
}

export default usePosts
