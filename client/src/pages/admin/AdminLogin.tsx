import React from 'react'
import LoginForm from '../../components/basic/LoginForm'
import type { LoginFormValues } from '../../constants/userTypes'

type Props = {}

const AdminLogin = (props: Props) => {

  const handleSubmit = (data: LoginFormValues) => {
    console.log('admin')
    console.log(data)
  }

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