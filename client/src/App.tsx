import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import NavigationBar from './components/basic/NavigationBar';
import { Route, Routes, useLocation } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { useEffect, useState } from 'react';

const App = () => {
  const location = useLocation()
  const noNavPaths = ['/login', '/signup', '/admin/login']
  const [showNavbar, setShowNavbar] = useState(() => (
    !noNavPaths.includes(location.pathname)
  ))

  useEffect(() => {
    setShowNavbar(!noNavPaths.includes(location.pathname))
  },[location.pathname])
  
  return (
    <>
      {showNavbar && <NavigationBar />}
      <ToastContainer theme='dark' />

      <Routes>
        <Route path='/admin/*' element={<AdminRoutes />} />
        <Route path='/*' element={<UserRoutes />} />
      </Routes>

    </>
  )
}

export default App