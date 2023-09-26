import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import { HomePage } from "../pages"
import { useUser } from "../service/user.service.ts"

const HomePageContainer = () => {
  const { authData, setAuthenticated, setAuthData } = useContext(AuthContext)

  useEffect(() => {
    if (authData.accessToken) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const home = useUser({
        authData,
        setAuthenticated,
        setAuthData,
      })

      home.getPostList().then((res) => {
        // eslint-disable-next-line no-console
        console.log(res)
      })
    }
  }, [ authData, setAuthData, setAuthenticated ])


  return (
    <HomePage />
  )
}

export default HomePageContainer
