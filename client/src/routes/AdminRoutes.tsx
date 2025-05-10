import AdminHome from '../pages/admin/AdminHome'
import { Route, Routes } from 'react-router-dom'

type Props = {}

const AdminRoutes = (props: Props) => {
  return (
    <Routes>
      <Route path='/' element={<AdminHome />} />
    </Routes>
  )
}

export default AdminRoutes