import { AuthResType, ServiceReturnType } from "../../constants/types";
import IUser from '../IUser'


interface IAuthService {

  signup(user: Pick<IUser, 'email' | 'password' | 'profile'>): ServiceReturnType<AuthResType>
  login(email: string, password: string): ServiceReturnType<AuthResType>
  logout(accessToken: string): ServiceReturnType<{ status: string }>

}

export default IAuthService