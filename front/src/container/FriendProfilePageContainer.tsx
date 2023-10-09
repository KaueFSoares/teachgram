import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUser } from "../service/user.service"
import { SingleFriendProfileResponse } from "../interface/friend_profile/response/SingleFriendProfileResponse"
import Loading from "../components/util/Loading"
import FriendProfilePage from "../pages/FriendProfilePage"
import { PostProfileData } from "../interface/profile/PostProfileData"
import usePosts from "../service/post.service"

const FriendProfilePageContainer = () => {
  const [ loading, setLoading ] = useState(true)
  const [ page, setPage ] = useState(0)
  const [ friendData, setFriendData ] = useState({} as SingleFriendProfileResponse)
  const [ postsData, setPostsData ] = useState<PostProfileData[]>([])

  const user = useUser()
  const post = usePosts()

  const { username } = useParams<{ username: string }>()
  
  const incrementPage = () => {
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    setLoading(true)
    user.getFriendProfile(username || "_").then((res) => {
      setFriendData(res)
      setLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ username ])

  useEffect(() => {
    setLoading(true)
    post.getFriendPosts(page, username || "_").then((res) => {
      setPostsData((prev) => prev.concat(res))
      setLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ page ])


  return (
    loading ? (
      <Loading/>
    ) : (
      <FriendProfilePage 
        incrementPage={incrementPage}
        friendData={friendData}
        postsData={postsData}
      />
    )
  )
}

export default FriendProfilePageContainer
