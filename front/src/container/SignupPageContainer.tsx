import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { SignupPage } from "../pages"
import { useAuth } from "../service/auth.service"

const SignupPageContainer = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  const { setAuthenticated, setAuthData } = useContext(AuthContext)

  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ bio, setBio ] = useState("")
  const [ phone, setPhone ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ photo, setPhoto ] = useState("")

  const handleSubmit = () => {
    auth.onSignup(name, email, bio, phone, password, photo)
      .then((data) => {
        setAuthenticated(true)
        setAuthData(data)
        navigate("/")
      })
  }
  
  return (
    <SignupPage
      name={name}
      email={email}
      bio={bio}
      phone={phone}
      password={password}
      setName={setName}
      setEmail={setEmail}
      setBio={setBio}
      setPhone={setPhone}
      setPassword={setPassword}
      photo={photo}
      setPhoto={setPhoto}
      handleSubmit={handleSubmit}
    />
  )
}

export default SignupPageContainer
