import { useEffect, useState } from 'react'
import Title from '../../components/basic/Title'
import type { BreadcrumbType } from '../../constants/types'
import UserCard from '../../components/user/UserCard'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectUserCurrentPage, selectUserNumberOfPages,
  selectUserUsers, selectUserUsersStatus
} from '../../features/user/userSlice'
import { selectAuthUser } from '../../features/auth/authSlice'
import type { AppDispatch } from '../../app/store'
import { getUsers } from '../../features/user/userApi'


const UsersPage = () => {
  const [breadcrumbs] = useState<BreadcrumbType[]>([
    { label: "Home", href: "/" },
    { label: "Users", href: '/users' }
  ])
  const dispatch  = useDispatch<AppDispatch>()
  const currentUser = useSelector(selectAuthUser)
  const status = useSelector(selectUserUsersStatus)
  const users = useSelector(selectUserUsers)
  const numberOfPages = useSelector(selectUserNumberOfPages)
  const currentPage = useSelector(selectUserCurrentPage)

  useEffect(() => {
    if (currentPage === 1) {
      dispatch(getUsers(1))
    }
  },[])

  return (
    <main className='min-h-screen'>
      <div className='mt-20' >
        <Title
          title='Users'
          breadcrumbs={breadcrumbs}
        />
      </div>

      <div className='flex justify-center gap-1 flex-wrap'>
        {status === 'success'
          && users.map(user => (
            user._id === currentUser?._id || user.roles.includes('admin')
              ? <></>
              : <UserCard user={user} />
          ))}
      </div>

    </main>
  )
}

export default UsersPage