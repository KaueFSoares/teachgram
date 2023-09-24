import { FormEvent, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoginPage } from "../pages"
import { useAuth } from "../service/auth.service"
import AuthContext from "../context/AuthContext"

const LoginPageContainer = () => {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  const auth = useAuth()
  const navigate = useNavigate()

  const { setAuthenticated, setAuthData } = useContext(AuthContext)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    auth.onLogin(email, password)
      .then((data) => {
        setAuthenticated(true)
        setAuthData(data)
        navigate("/")
      })
  }

  return (
    <LoginPage
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword} 
      handleSubmit={handleSubmit}
    />
  )
}

export default LoginPageContainer
