import { useParams } from "react-router-dom"

const FriendProfilePageContainer = () => {
  const { username } = useParams<{ username: string }>()
  
  return (
    <div>{username}</div>
  )
}

export default FriendProfilePageContainer
