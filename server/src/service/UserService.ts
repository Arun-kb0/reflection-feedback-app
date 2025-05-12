import { ServiceReturnType, UserPaginationType } from "../constants/types";
import IUser from "../interfaces/IUser";
import IUserService from "../interfaces/user/IUserService";
import IUserRepo from "../interfaces/auth/IUserRepo";
import { handleServiceData } from '../util/handleService'

class UserService implements IUserService {

  constructor(
    private userRepo: IUserRepo,
    private limit: number
  ) { }

  async getUsers(page: number): ServiceReturnType<UserPaginationType> {
    try {
      const startIndex = (page - 1) * this.limit
      const total = await this.userRepo.countUsers()
      const numberOfPages = Math.ceil(total / this.limit)
      const users = await this.userRepo.findAllUsers(this.limit, startIndex)
      const data = {
        users,
        currentPage: page,
        numberOfPages
      }
      return handleServiceData(data)
    } catch (error) {
      throw error
    }
  }

 async getUser(userId: string): ServiceReturnType<IUser | null> {
    try {
      const user = await this.userRepo.findUserByUserId(userId)
      return handleServiceData(user)
    } catch (error) {
      throw error
    }
  }

}

export default UserService