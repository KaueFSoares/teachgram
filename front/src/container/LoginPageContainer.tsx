import { useState } from "react"
import LoginPage from "../pages/LoginPage"

const LoginPageContainer = () => {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  return (
    <LoginPage
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword} 
    />
  )
}

export default LoginPageContainer
