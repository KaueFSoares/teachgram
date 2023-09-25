import { Post } from "./Post"

export interface PostList {
  posts: Post[]
  page: number
  totalPages: number
  totalPosts: number
  first: boolean
  last: boolean
}
