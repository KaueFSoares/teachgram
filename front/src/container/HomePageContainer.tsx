import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import { HomePage } from "../pages"
import { useHome } from "../service/home.service"

const HomePageContainer = () => {
  const { authData, setAuthenticated, setAuthData } = useContext(AuthContext)

  useEffect(() => {
    if (authData.accessToken) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const home = useHome({
        authData,
        setAuthenticated,
        setAuthData,
      })

      home.getHome().then((res) => {
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
