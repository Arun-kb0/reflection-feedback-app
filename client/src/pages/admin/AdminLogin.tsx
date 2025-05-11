import React, { useEffect } from 'react'
import LoginForm from '../../components/basic/LoginForm'
import type { LoginFormValues } from '../../constants/userTypes'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../../app/store'
import { login } from '../../features/auth/authApi'
import { useNavigate } from 'react-router-dom'
import { selectAuthStatus } from '../../features/auth/authSlice'

type Props = {}

const AdminLogin = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const status = useSelector(selectAuthStatus)


  const handleSubmit = (data: LoginFormValues) => {
    console.log('admin')
    dispatch(login(data))
  }

  useEffect(() => {
    if (status === 'success') {
      navigate('/admin/')
    }
  }, [status])

  return (
    <main className='flex justify-center items-center min-h-screen '>
      <LoginForm
        title='Admin Sign In'
        isAdmin={true}
        onSubmit={handleSubmit}
      />

    </main>
  )
}

export default AdminLogin