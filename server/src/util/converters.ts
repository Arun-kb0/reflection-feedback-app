import { Date as MongoDate, Schema, Types } from "mongoose";
import { IUserDb } from '../model/userModel'
import IUser from '../interfaces/IUser'


export const stringToDate = (str: string): MongoDate => {
  return new Date(str) as unknown as Schema.Types.Date
}

export const convertToObjectId = (id: string): Types.ObjectId | null => {
  return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null
}


export const convertIUserDbToIUser = (user: IUserDb): IUser => {
  return {
    _id: user._id.toString(),
    email: user.email,
    password: user.password,
    accessToken: user.accessToken,
    profile: user.profile,
    roles: user.roles,
    createdAt: user.createdAt.toString(),
    updatedAt: user.updatedAt.toString()
  }
}

export const convertIUserToIUserDb = (user: Partial<IUser>): IUserDb => {
  const conversionMap: { [key: string]: (value: any) => any } = {
    _id: convertToObjectId,
    createdAt: stringToDate,
    updatedAt: stringToDate,
  }
  const userDb: Partial<IUserDb> = {}
  Object.keys(user).forEach((key) => {
    const typedKey = key as keyof IUser;
    if (user[typedKey] && conversionMap[typedKey]) {
      userDb[typedKey] = conversionMap[typedKey](user[typedKey])
    } else if (user[typedKey]) {
      userDb[typedKey as keyof IUser] = user[typedKey] as any;
    }
  })

  return userDb as IUserDb
}