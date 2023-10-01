import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useUser } from "../../service/user.service.ts"
import NavbarItem from "./NavbarItem.tsx"


const Navbar = () => {
  const [ imgSrc, setImgSrc ] = useState<string>("")

  const { t } = useTranslation()

  const user = useUser()
  
  useEffect(() => {
    user.getUserPhoto().then((res) => {
      setImgSrc(res)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ])

  return (
    <nav className="w-full flex fixed bottom-0 left-0 shadow-full p-6 bg-white
                    lg:w-1/4 lg:h-full lg:shadow-none lg:flex-col lg:gap-16 lg:py-12 lg:px-8 lg:left-8
                    xl:w-1/5
                    2xl:w-1/6 2xl:left-16">
      <img src="/images/full_logo.svg" alt="" 
        className="hidden w-full
                    lg:flex"/>
      <ul className="w-full flex justify-between
                    lg:flex-col lg:gap-8">
        <NavbarItem order={"order-1"}>
          <Link className="flex items-center justify-center gap-4  lg:py-3 lg:px-4 lg:justify-start w-full " to={"/"}>
            <img src="/icon/navbar/home.svg" className="w-5 h-5" alt="" />
            <span className="hidden lg:flex text-gray text-base">{t("navbar.feed")}</span>
          </Link>
        </NavbarItem>
        <NavbarItem order={"order-2"}>
          <Link className="flex items-center justify-center gap-4  lg:py-3 lg:px-4 lg:justify-start w-full " to={"/friends"}>
            <img src="/icon/navbar/friends.svg" className="w-7 h-7" alt="" />
            <span className="hidden lg:flex text-gray text-base">{t("navbar.friends")}</span>
          </Link>
        </NavbarItem>
        <NavbarItem order={"order-3 lg:order-5"}>
          <Link className="flex items-center justify-center gap-4  lg:py-3 lg:px-4 lg:justify-start w-full " to={"/home"}>
            <img src="/icon/navbar/new.svg" className="w-8 h-8 lg:w-6 lg:h-6" alt="" />
            <span className="hidden lg:flex text-gray text-base">{t("navbar.create")}</span>
          </Link>
        </NavbarItem>
        <NavbarItem order={"order-4"}>
          <Link className="flex items-center justify-center gap-4  lg:py-3 lg:px-4 lg:justify-start w-full" to={"/home"}>
            <img src="/icon/navbar/config.svg" className="w-6 h-6 lg:w-6" alt="" />
            <span className="hidden lg:flex text-gray text-base">{t("navbar.config")}</span>
          </Link>
        </NavbarItem>
        <NavbarItem order={"order-5 lg:order-3"}>
          <Link className="flex items-center justify-center gap-4  lg:py-3 lg:px-4 lg:justify-start w-full overflow-hidden" to={"/home"}>
            <img src={imgSrc} className="w-7 h-7  rounded-full border border-gray border-solid" alt="" />
            <span className="hidden lg:flex text-gray text-base">{t("navbar.profile")}</span>
          </Link>
        </NavbarItem>
      </ul>
    </nav>
  )
}

export default Navbar
