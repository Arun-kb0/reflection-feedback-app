import httpStatus from "../constants/httpStatus";
import { ServiceReturnType, AuthResType } from "../constants/types";
import IAuthService from "../interfaces/auth/IAuthService";
import IUserRepo from "../interfaces/auth/IUserRepo";
import IUser from "../interfaces/IUser";
import { handleServiceData } from '../util/handleService'
import HttpError from "../util/HttpError";
import bcrypt from 'bcrypt'
import jwt, { JwtPayload, VerifyCallback, VerifyErrors } from "jsonwebtoken";


const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string || 'secret'
const ACCESS_EXPIRES_IN = '1h'


class AuthService implements IAuthService {

  constructor(
    private userRepo: IUserRepo
  ) { }

  async signup(user: Pick<IUser, "email" | "password" | "profile">): ServiceReturnType<AuthResType> {
    try {
      const { email, password, profile } = user
      const foundUser = await this.userRepo.findUserByEmail(email)
      if (foundUser) throw new HttpError(httpStatus.CONFLICT, 'User already exits')

      const hashedPassword = await bcrypt.hash(password, 10)
      const userWithData = {
        email,
        password: hashedPassword,
        profile: profile,
      }
      const newUser = await this.userRepo.createUser(userWithData)
      const accessToken = jwt.sign(
        { "email": email, "userId": newUser._id, "roles": newUser.roles },
        ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_EXPIRES_IN }
      )
      const updatedUser = await this.userRepo.updateUser(newUser._id, { accessToken })
      if (!updatedUser) throw new Error('Signup failed')
      
      return handleServiceData<AuthResType>({ user: updatedUser, accessToken })
    } catch (error) {
      throw error
    }
  }

  login(email: string, password: string): ServiceReturnType<AuthResType> {
    throw new Error("Method not implemented.");
  }

  logout(accessToken: string): ServiceReturnType<{ status: string; }> {
    throw new Error("Method not implemented.");
  }

}

export default AuthService