import IUser from "../IUser"

interface IUserRepo {

  createUser(user: Pick<IUser, 'email' | 'password' | 'profile'>): Promise<IUser>
  updateUser(user: Partial<IUser>): Promise<IUser | null>
  findUserByEmail(email: string): Promise<IUser | null>
  findUserByToken(accessToken: string): Promise<IUser | null>

}

export default IUserRepo