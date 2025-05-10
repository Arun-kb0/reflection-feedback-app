import { Route, Routes } from "react-router-dom"
import Home from "../pages/user/Home"
import type { UserType } from "../constants/userTypes"
import RequireAuth from "./RequireAuth"
import WriteFeedback from "../pages/user/WriteFeedback"
import Login from "../pages/user/Login"
import Signup from "../pages/user/Signup"


type Props = {
  user: UserType
}

const UserRoutes = ({ user }: Props) => {
  return (
    <Routes>

      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />

      <Route element={<RequireAuth roles={["requestor"]} />}>
        <Route path='/' element={<Home />} />
      </Route>

      <Route element={<RequireAuth roles={["requestor", "provider"]} />}>
        <Route path='/' element={<Home />} />
        <Route path='/' element={<WriteFeedback />} />
      </Route>

    </Routes>
  )
}

export default UserRoutes