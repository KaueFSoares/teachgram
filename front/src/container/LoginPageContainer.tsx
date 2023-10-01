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

  const handleSubmit = () => {
    setLoading(true)

    onLogin(email, password)
      .then(() => {
        setAuthenticated(true)
        navigate("/")
      })
      .catch((err) => {
        err === err
        setLoading(false)
      })
  }

  return (
    loading ? (
      <Loading />
    ) : (
      <LoginPage
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword} 
        handleSubmit={handleSubmit}
      />
    )
  )
}

export default LoginPageContainer
