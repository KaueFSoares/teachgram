import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

const NavbarItem = ({ children }: Props) => {
  return (
    <li className="w-8 h-8 flex items-center justify-center">
      {children}
    </li>
  )
}

export default NavbarItem
