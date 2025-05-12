import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Home from "../pages/user/Home"
import RequireAuth from "./RequireAuth"
import WriteFeedback from "../pages/user/WriteFeedback"
import Login from "../pages/user/Login"
import Signup from "../pages/user/Signup"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectAuthUser } from "../features/auth/authSlice"
import NotFound from "../pages/basic/NotFound"
import UsersPage from "../pages/user/UsersPage"


const UserRoutes = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useSelector(selectAuthUser)

  useEffect(() => {
    if (user) {
      if (user.roles.includes('admin')) {
        navigate('/admin/')
        return
      }
    }
  }, [location.pathname, user])

  return (
    <Routes>

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route element={<RequireAuth allowedRoles={["requestor", "provider"]} />}>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<UsersPage />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={["provider"]} />}>
        <Route path='/write' element={<WriteFeedback />} />
      </Route>

      <Route path='*' element={<NotFound  />} />
    </Routes>
  )
}

export default UserRoutes