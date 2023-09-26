import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useUser } from "../../../service/user.service.ts"
import AuthContext from "../../../context/AuthContext.tsx"
import NavbarItem from "./NavbarItem.tsx"


const Navbar = () => {
  const { authData, setAuthenticated, setAuthData } = useContext(AuthContext)

  const [ imgSrc, setImgSrc ] = useState<string>("")

  useEffect(() => {
    if (authData.accessToken) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const home = useUser({
        authData,
        setAuthenticated,
        setAuthData,
      })

      home.getUserPhoto().then((res) => {
        setImgSrc(res)
      })
    }
  }, [ authData, setAuthData, setAuthenticated ])

  return (
    <nav className="w-full flex absolute bottom-0 left-0 shadow-full p-7">
      <ul className="w-full flex justify-between">
        <NavbarItem>
          <Link className="w-6" to={"/"}>
            <img src="/icon/navbar/home.svg" className="w-full" alt="" />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="w-full" to={"/friends"}>
            <img src="/icon/navbar/friends.svg" className="w-full" alt="" />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="w-full h-full" to={"/home"}>
            <img src="/icon/navbar/new.svg" className="w-full h-full" alt="" />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="w-6" to={"/home"}>
            <img src="/icon/navbar/config.svg" className="w-full" alt="" />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="w-full h-full overflow-hidden rounded-full border border-gray border-solid" to={"/home"}>
            <img src={imgSrc} className="w-full" alt="" />
          </Link>
        </NavbarItem>
      </ul>
    </nav>
  )
}

export default Navbar
