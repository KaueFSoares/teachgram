import { ReactNode } from "react"

interface Props {
    children: ReactNode,
    order: string
}

const NavbarItem = ({ children, order }: Props) => {
  return (
    <li className={`w-full flex items-center justify-center
                    lg:justify-start lg:border lg:border-solid lg:border-gray lg:rounded-xl
                    ${order}`}>
      {children}
    </li>
  )
}

export default NavbarItem
