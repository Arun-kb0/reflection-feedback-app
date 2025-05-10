import UserBaseRepo from './repositories/base/UserBaseRepo'
import UserRepo from './repositories/UserRepo'
import AuthService from './service/AuthService'
import AuthController from './controllers/AuthController'
import IUser from './interfaces/IUser'
import { IUserDb } from './model/userModel'

const userBaseRepo = new UserBaseRepo<Partial<IUser>, IUserDb>()
const userRepo = new UserRepo(userBaseRepo)

const authService = new AuthService(userRepo)
export const authController = new AuthController(authService)