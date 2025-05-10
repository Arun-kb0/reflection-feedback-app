import IUserBaseRepo from "../interfaces/auth/IUserBaseRepo";
import IUserRepo from "../interfaces/auth/IUserRepo";
import IUser from "../interfaces/IUser";
import { IUserDb } from "../model/userModel";

class UserRepo implements IUserRepo {

  constructor(
    private userBaseRepo: IUserBaseRepo<Partial<IUser>, IUserDb>
  ) { }

  createUser(user: Pick<IUser, "email" | "password" | "profile">): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  updateUser(user: Partial<IUser>): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }

  findUserByEmail(email: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }

  findUserByToken(accessToken: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }


}

export default UserRepo