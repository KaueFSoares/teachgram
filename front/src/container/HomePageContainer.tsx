import { useEffect, useState } from "react"
import { HomePage } from "../pages"
import Loading from "../components/layout/util/Loading.tsx"
import usePosts from "../service/post.service.ts"

const HomePageContainer = () => {
  const [ loading, setLoading ] = useState(true)

  const posts = usePosts()

  useEffect(() => {
    posts.getPostList().then((res) => {
      // eslint-disable-next-line no-console
      console.log(res)
      setLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [  ])


  return (
    loading ? (
      <Loading />
    ) : (
      <HomePage />
    )
  )
}

export default HomePageContainer
