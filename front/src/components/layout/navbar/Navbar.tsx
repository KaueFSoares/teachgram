import { Link } from "react-router-dom"

interface Props {
    imgSrc: string
}

const Navbar = ({ imgSrc }: Props) => {
  return (
    <nav className="w-full flex absolute bottom-0 left-0 shadow-full p-7">
      <ul className="w-full flex justify-between">
        <li className="w-6 h-8 flex items-center justify-center">
          <Link className="w-full" to={"/"}>
            <img src="/icon/navbar/home.svg" className="w-full" alt="" />
          </Link>
        </li>
        <li className="w-8 h-8 flex items-center justify-center">
          <Link className="w-full" to={"/friends"}>
            <img src="/icon/navbar/friends.svg" className="w-full" alt="" />
          </Link>
        </li>
        <li className="w-8 h-8 flex items-center justify-center">
          <Link className="w-full h-full" to={"/home"}>
            <img src="/icon/navbar/new.svg" className="w-full h-full" alt="" />
          </Link>
        </li>
        <li className="w-6 h-8 flex items-center justify-center">
          <Link className="w-full" to={"/home"}>
            <img src="/icon/navbar/config.svg" className="w-full" alt="" />
          </Link>
        </li>
        <li className="w-8 h-8 flex items-center justify-center">
          <Link className="w-full h-full overflow-hidden rounded-full border border-gray border-solid" to={"/home"}>
            <img src={imgSrc} className="w-full" alt="" />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
