import IUserBaseRepo from "../../interfaces/auth/IUserBaseRepo";
import handleRepoError from '../../util/handleRepoError'
import { IUserDb } from '../../model/userModel'
import { Model } from "mongoose";
import { convertToObjectId } from "../../util/converters";

class UserBaseRepo<T, U> implements IUserBaseRepo<T, U> {

  constructor(
    private userModel: Model<IUserDb>
  ) { }

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

  findById(userId: string): Promise<U | null> {
    throw new Error("Method not implemented.");
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