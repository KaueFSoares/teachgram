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
  const [ isFriend, setIsFriend ] = useState(false)

  const user = useUser()
  const post = usePosts()

  const { username } = useParams<{ username: string }>()
  
  const incrementPage = () => {
    setPage((prev) => prev + 1)
  }

  const add = () => {
    user.addFriend(friendData.id).then(() => {
      setIsFriend(true)
    })
  }

  const remove = () => {
    user.removeFriend(friendData.id).then(() => {
      setIsFriend(false)
    })
  }

  useEffect(() => {
    setLoading(true)
    user.getProfileByUsername(username || "_").then((res) => {
      setFriendData(res)
      setIsFriend(res.isFriend)
      setLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ username ])

  useEffect(() => {
    post.getAnyUserPosts(page, username || "_").then((res) => {
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
        add={add}
        remove={remove}
        isFriend={isFriend}
        friendData={friendData}
        postsData={postsData}
      />
    )
  )
}

export default FriendProfilePageContainer
