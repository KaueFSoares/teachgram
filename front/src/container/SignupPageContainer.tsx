import { FormEvent, useState } from "react"
import SignupPage from "../pages/SignupPage"
import { useAuth } from "../service/auth.service"

const SignupPageContainer = () => {
  const auth = useAuth()

  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ bio, setBio ] = useState("")
  const [ phone, setPhone ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ photo, setPhoto ] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    auth.onSignup(name, email, bio, phone, password, photo)
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
