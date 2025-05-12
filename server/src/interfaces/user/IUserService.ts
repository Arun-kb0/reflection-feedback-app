import { ServiceReturnType, UserPaginationType } from '../../constants/types'
import IUser from '../IUser'

interface IUserService {

  getUsers(page: number): ServiceReturnType<UserPaginationType>
  getUser(userId: string): ServiceReturnType<IUser | null>

}

export default IUserService