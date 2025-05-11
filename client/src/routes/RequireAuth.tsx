import { useSelector } from 'react-redux'
import type { RolesType } from '../constants/userTypes'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { selectAuthUser } from '../features/auth/authSlice'

type Props = {
  allowedRoles: RolesType[]
  fallbackPath?: string
}

const RequireAuth = ({ allowedRoles, fallbackPath }: Props) => {
  const navigate = useNavigate()
  const user = useSelector(selectAuthUser)


  if (!user) {
    return <Navigate to='/login' replace />
  }

  const hasAccess = user?.roles?.some((role: RolesType) => allowedRoles.includes(role))
  if (!hasAccess) {
    if (fallbackPath) {
      return <Navigate to={fallbackPath} replace />
    } else if (window.history.length > 1) {
      navigate(-1)
      return null
    } else {
      return <Navigate to='/' replace />
    } 
  }

  return <Outlet />
}

export default RequireAuth