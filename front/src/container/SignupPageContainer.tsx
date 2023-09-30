import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { SignupPage } from "../pages"
import { onSignup } from "../service/auth.service"

const SignupPageContainer = () => {
  const navigate = useNavigate()

  const { setAuthenticated } = useContext(AuthContext)

  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ username, setUsername ] = useState("")
  const [ bio, setBio ] = useState("")
  const [ phone, setPhone ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ photo, setPhoto ] = useState("")

  const handleSubmit = () => {
    onSignup(name, email, bio, phone, password, photo)
      .then(() => {
        setAuthenticated(true)
        navigate("/")
      })
  }
  
  return (
    <SignupPage
      name={name}
      email={email}
      username={username}
      bio={bio}
      phone={phone}
      password={password}
      setName={setName}
      setEmail={setEmail}
      setUsername={setUsername}
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
