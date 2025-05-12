import UserBaseRepo from './repositories/base/UserBaseRepo'
import UserRepo from './repositories/UserRepo'
import AuthService from './service/AuthService'
import AuthController from './controllers/AuthController'
import { IUserDb } from './model/userModel'
import userModel from './model/userModel'
import { IFormConfigDb } from './model/fromConfigModel'
import FormConfigBaseRepo from './repositories/base/FormConfigBaseRepo'
import FormRepo from './repositories/FormRepo'
import FormService from './service/FormService'
import FormController from './controllers/FormController'
import formConfigModel from './model/fromConfigModel'
import UserService from './service/UserService'
import UserController from './controllers/UserController'

const LIMIT = process.env.LIMIT || 10

// *auth & user 
const userBaseRepo = new UserBaseRepo<Partial<IUserDb>, IUserDb>(userModel)
const userRepo = new UserRepo(userBaseRepo)

const authService = new AuthService(userRepo)
export const authController = new AuthController(authService)

const userService = new UserService(userRepo, Number(LIMIT))
export const userController = new UserController(userService)

// * form
const formConfigBaseRepo = new FormConfigBaseRepo<Partial<IFormConfigDb>, IFormConfigDb>(formConfigModel)
const formRepo = new FormRepo(
  formConfigBaseRepo
)
const formService = new FormService(formRepo)
export const formController = new FormController(formService)