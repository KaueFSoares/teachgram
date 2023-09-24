import { Navigate, Outlet } from "react-router-dom"

interface Props {
  authenticated: boolean
}

const PrivateRoutes = ({ authenticated }: Props) => {
  return authenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
