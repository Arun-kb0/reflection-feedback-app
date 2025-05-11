import AdminHome from '../pages/admin/AdminHome'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/admin/AdminLogin'
import RequireAuth from './RequireAuth'
import NotFound from '../pages/basic/NotFound'


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<AdminLogin />} />

      <Route element={<RequireAuth allowedRoles={['admin']} fallbackPath='/login' />}>
        <Route path='/' element={<AdminHome />} />
      </Route>

      <Route path='*' element={<NotFound />} />

    </Routes>
  )
}

export default AdminRoutes