import type { RolesType } from '../constants/userTypes'
import { Navigate, Outlet } from 'react-router-dom'

type Props = {
  roles: RolesType[]
}

const RequireAuth = ({ roles }: Props) => {
  // ! load this from selector
  const user = {}

  return (
    user
      ? <Outlet />
      : <Navigate
        to='/login'
        replace
      />
  )
}

export default RequireAuth