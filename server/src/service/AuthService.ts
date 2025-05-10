import { ServiceReturnType, AuthResType } from "../constants/types";
import IAuthService from "../interfaces/auth/IAuthService";
import IUserRepo from "../interfaces/auth/IUserRepo";
import IUser from "../interfaces/IUser";

class AuthService implements IAuthService {

  constructor(
    private userRepo: IUserRepo
  ){}
  
  signup(user: Pick<IUser, "email" | "password" | "profile">): ServiceReturnType<AuthResType> {
    throw new Error("Method not implemented.");
  }

  login(email: string, password: string): ServiceReturnType<AuthResType> {
    throw new Error("Method not implemented.");
  }

  logout(accessToken: string): ServiceReturnType<{ status: string; }> {
    throw new Error("Method not implemented.");
  }
  
}

export default AuthService