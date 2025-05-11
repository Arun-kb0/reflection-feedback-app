import AdminHome from '../pages/admin/AdminHome'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/admin/AdminLogin'
import RequireAuth from './RequireAuth'

type Props = {}

const AdminRoutes = (props: Props) => {
  return (
    <Routes>
      <Route path='/login' element={<AdminLogin />} />

      <Route element={<RequireAuth allowedRoles={['admin']} fallbackPath='/login' />}>
        <Route path='/' element={<AdminHome />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes