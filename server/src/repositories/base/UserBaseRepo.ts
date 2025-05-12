import IUserBaseRepo from "../../interfaces/auth/IUserBaseRepo";
import handleRepoError from '../../util/handleRepoError'
import { IUserDb } from '../../model/userModel'
import { Model } from "mongoose";
import { convertToObjectId } from "../../util/converters";

class UserBaseRepo<T, U> implements IUserBaseRepo<T, U> {

  constructor(
    private userModel: Model<IUserDb>
  ) { }

  async count(): Promise<number> {
    try {
      const count = await this.userModel.countDocuments()
      return count
    } catch (error) {
      return handleRepoError(error)
    }
  }

  async findAllUsers(limit: number, startIndex: number): Promise<U[]> {
    try {
      const users = await this.userModel.find()
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit)
      return users as unknown as U[]
    } catch (error) {
      return handleRepoError(error)
    }
  }

  async create(user: T): Promise<U> {
    try {
      const newUser = await this.userModel.create(user)
      return newUser as unknown as U
    } catch (error) {
      return handleRepoError(error)
    }
  }

  async update(userId: string, user: T): Promise<U | null> {
    try {
      const userObjId = convertToObjectId(userId)
      const updatedUser = await this.userModel.findOneAndUpdate(
        { _id: userId },
        { $set: user as IUserDb },
        { new: true }
      )
      return updatedUser as unknown as U
    } catch (error) {
      return handleRepoError(error)
    }
  }

  async findById(userId: string): Promise<U | null> {
    try {
      const userObjId = convertToObjectId(userId)
      const user = await this.userModel.findOne({ _id: userObjId })
      return user as unknown as U
    } catch (error) {
      return handleRepoError(error)
    }
  }

  async findByEmail(email: string): Promise<U | null> {
    try {
      const user = await this.userModel.findOne({ email })
      return user as unknown as U
    } catch (error) {
      return handleRepoError(error)
    }
  }

  async findByAccessToken(accessToken: string): Promise<U | null> {
    try {
      const user = await this.userModel.findOne({ accessToken })
      return user as unknown as U
    } catch (error) {
      return handleRepoError(error)
    }
  }


}

export default UserBaseRepo