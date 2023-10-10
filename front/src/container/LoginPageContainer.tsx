import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoginPage } from "../pages"
import { onLogin } from "../service/auth.service"
import AuthContext from "../context/AuthContext"
import Loading from "../components/util/Loading.tsx"

const LoginPageContainer = () => {
  const navigate = useNavigate()

  const { setAuthenticated } = useContext(AuthContext)

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  const [ loading, setLoading ] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)

    return await onLogin(email, password)
      .then((res) => {
        setAuthenticated(true)
        navigate("/")
        
        return res
      })
      .catch(() => {
        setLoading(false)
        
        return null
      })
  }

  return (
    <>
      <LoginPage
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword} 
        handleSubmit={handleSubmit}
      />

      {loading && <Loading />}
    </>
  )
}

export default LoginPageContainer
