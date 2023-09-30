import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import { HomePage } from "../pages"
import { useUser } from "../service/user.service.ts"
import Loading from "../components/layout/util/Loading.tsx"

const HomePageContainer = () => {
  const home = useUser()

  const { authData } = useContext(AuthContext)

  const [ loading, setLoading ] = useState(true)


  useEffect(() => {
    if (authData.accessToken) {
      home.getPostList().then((res) => {
        // eslint-disable-next-line no-console
        console.log(res)
        setLoading(false)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ authData ])


  return (
    loading ? (
      <Loading />
    ) : (
      <HomePage />
    )
  )
}

export default HomePageContainer
