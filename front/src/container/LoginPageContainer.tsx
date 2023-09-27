import { FormEvent, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoginPage } from "../pages"
import { useAuth } from "../service/auth.service"
import AuthContext from "../context/AuthContext"
import Loading from "../components/layout/util/Loading.tsx"

const LoginPageContainer = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  const { setAuthenticated, setAuthData } = useContext(AuthContext)

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  const [ loading, setLoading ] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    auth.onLogin(email, password)
      .then((data) => {
        setAuthenticated(true)
        setAuthData(data)
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
