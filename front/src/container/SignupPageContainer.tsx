import { useState } from "react"
import SignupPage from "../pages/SignupPage"

const SignupPageContainer = () => {
  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ bio, setBio ] = useState("")
  const [ phone, setPhone ] = useState("")
  const [ password, setPassword ] = useState("")

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
    />
  )
}

export default SignupPageContainer
