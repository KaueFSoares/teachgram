import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import { HomePage } from "../pages"
import { useUser } from "../service/user.service.ts"
import Loading from "../components/layout/util/Loading.tsx"

const HomePageContainer = () => {
  const { authData, setAuthenticated, setAuthData } = useContext(AuthContext)

  const [ loading, setLoading ] = useState(true)

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
        setLoading(false)
      })
    }
  }, [ authData, setAuthData, setAuthenticated ])


  return (
    loading ? (
      <Loading />
    ) : (
      <HomePage />
    )
  )
}

export default HomePageContainer
