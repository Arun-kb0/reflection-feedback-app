import { error } from "winston";
import IUserBaseRepo from "../interfaces/auth/IUserBaseRepo";
import IUserRepo from "../interfaces/auth/IUserRepo";
import IUser from "../interfaces/IUser";
import { IUserDb } from "../model/userModel";
import { convertIUserDbToIUser, convertIUserToIUserDb } from '../util/converters'

class UserRepo implements IUserRepo {

  constructor(
    private userBaseRepo: IUserBaseRepo<Partial<IUserDb>, IUserDb>,
  ) { }

  async findUserByUserId(userId: string): Promise<IUser | null> {
    try {
      const user = await this.userBaseRepo.findById(userId)
      return user ? convertIUserDbToIUser(user) : null
    } catch (error) {
      throw error
    }
  }

  async countUsers(): Promise<number> {
    try {
      const count = await this.userBaseRepo.count()
      return count
    } catch (error) {
      throw error
    }
  }

  async findAllUsers(limit: number, startIndex: number): Promise<IUser[]> {
    try {
      const users = await this.userBaseRepo.findAllUsers(limit, startIndex)
      return users.map(user => convertIUserDbToIUser(user))
    } catch (error) {
      throw error
    }
  }

  async createUser(user: Pick<IUser, "email" | "password" | "profile">): Promise<IUser> {
    try {
      const convertedUser = convertIUserToIUserDb(user)
      const newUser = await this.userBaseRepo.create(convertedUser)
      return convertIUserDbToIUser(newUser)
    } catch (error) {
      throw error
    }
  }

  async updateUser(userId: string, user: Partial<IUser>): Promise<IUser | null> {
    try {
      const convertedUser = convertIUserToIUserDb(user)
      const updated = await this.userBaseRepo.update(userId, convertedUser)
      return updated ? convertIUserDbToIUser(updated) : null
    } catch (error) {
      throw error
    }
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      const foundUser = await this.userBaseRepo.findByEmail(email)
      return foundUser ? convertIUserDbToIUser(foundUser) : null
    } catch (error) {
      throw error
    }
  }

  async findUserByToken(accessToken: string): Promise<IUser | null> {
    try {
      const foundUser = await this.userBaseRepo.findByAccessToken(accessToken)
      return foundUser ? convertIUserDbToIUser(foundUser) : null
    } catch {
      throw error
    }
  }


}

export default UserRepo