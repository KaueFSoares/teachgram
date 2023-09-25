import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import { HomePage } from "../pages"
import { useHome } from "../service/home.service"
import { User } from "../interface/home/User.ts"

const HomePageContainer = () => {
  const { authData, setAuthenticated, setAuthData } = useContext(AuthContext)

  const [ user, setUser ] = useState<User>()

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
        setUser(res.userData)
      })
    }
  }, [ authData, setAuthData, setAuthenticated ])


  return (
    <HomePage 
      imgSrc={user?.photo || ""}
    />
  )
}

export default HomePageContainer
