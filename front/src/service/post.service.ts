import { PostList } from "../interface/home/PostList"
import { PostResponse } from "../interface/home/response/PostResponse"
import useApi from "./api/api"
import { URL } from "./api/url"

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

const usePosts = () => {
  const api = useApi()

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

  return {
    getPostList: getPostList,    
  }
}

export default usePosts
