import { useEffect, useState } from "react"
import { HomePage } from "../pages"
import Loading from "../components/util/Loading.tsx"
import usePosts from "../service/post.service.ts"
import { Post } from "../interface/home/Post.ts"

const HomePageContainer = () => {
  const [ loading, setLoading ] = useState(true)
  const [ page, setPage ] = useState(0)
  const [ posts, setPosts ] = useState<Post[]>([])

  const postService = usePosts()

  useEffect(() => {
    postService.getPosts(page).then((res) => {
      setPosts((prev) => prev.concat(res))
      setLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ page ])

  const incrementPage = () => {
    setPage((prev) => prev + 1)
  }

  return (
    loading ? (
      <Loading />
    ) : (
      <HomePage
        posts={posts}
        incrementPage={incrementPage} 
      />
    )
  )
}

export default HomePageContainer
