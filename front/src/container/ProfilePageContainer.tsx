import { useEffect, useState } from "react"
import { UserProfileData } from "../interface/profile/UserProfileData"
import { PostProfileData } from "../interface/profile/PostProfileData"
import { useUser } from "../service/user.service"
import usePosts from "../service/post.service"
import { ProfilePage } from "../pages"
import Loading from "../components/util/Loading"

const ProfilePageContainer = () => {
  const [ loading, setLoading ] = useState(true)
  const [ page, setPage ] = useState(0)
  const [ userProfileData, setUserProfileData ] = useState<UserProfileData>({} as UserProfileData)
  const [ userPostsData, setUserPostsData ] = useState<PostProfileData[]>([])

  const user = useUser()
  const post = usePosts()

  const incrementPage = () => {
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    setLoading(true)
    post.getOwnPosts(page).then((res) => {
      setUserPostsData(res)
      setLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ page ])

  useEffect(() => {
    setLoading(true)
    user.getProfileData().then((res) => {
      setUserProfileData(res)
      setLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    loading ? (
      <Loading />
    ) : (
      <ProfilePage 
        incrementPage={incrementPage}
        userPostsData={userPostsData}
        userProfileData={userProfileData}
      />
    )
  )
}

export default ProfilePageContainer
