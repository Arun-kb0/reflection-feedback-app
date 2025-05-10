import AdminHome from '../pages/admin/AdminHome'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/admin/AdminLogin'

type Props = {}

const AdminRoutes = (props: Props) => {
  return (
    <Routes>
      <Route path='/login' element={<AdminLogin />} />

      {/* ! auth routes */}
      <Route path='/login' element={<AdminHome />} />
    </Routes>
  )
}

export default AdminRoutes