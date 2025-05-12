import { Date as MongoDate, Schema, Types } from "mongoose";
import { IUserDb } from '../model/userModel'
import IUser from '../interfaces/IUser'
import IFormConfig from '../interfaces/IFormConfig'
import { IFormConfigDb } from '../model/fromConfigModel'
import IFeedback from '../interfaces/IFeedback'
import { IFeedbackDb } from '../model/feedbackModel'


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

export const convertIFormConfigDbToIFormConfig = (formConfig: IFormConfigDb): IFormConfig => {
  return {
    _id: formConfig._id.toString(),
    name: formConfig.name,
    fields: formConfig.fields,
    isAnonymousAllowed: formConfig.isAnonymousAllowed,
    recallTimeFrame: formConfig.recallTimeFrame,
    requestLimits: formConfig.requestLimits,
    effectiveFrom: formConfig.effectiveFrom.toString(),
    createdAt: formConfig.createdAt.toString(),
    updatedAt: formConfig.updatedAt.toString()
  }
}

export const convertIFormConfigToIFormConfigDb = (formConfig: Partial<IFormConfig>): Partial<IFormConfigDb> => {
  const conversionMap: { [key: string]: (value: any) => any } = {
    _id: convertToObjectId,
    effectiveFrom: stringToDate,
    createdAt: stringToDate,
    updatedAt: stringToDate,
  }
  const formConfigDb: Partial<IFormConfigDb> = {}
  Object.keys(formConfig).forEach((key) => {
    const typedKey = key as keyof IFormConfig;
    if (formConfig[typedKey] && conversionMap[typedKey]) {
      formConfigDb[typedKey] = conversionMap[typedKey](formConfig[typedKey])
    } else if (formConfig[typedKey]) {
      formConfigDb[typedKey as keyof IFormConfig] = formConfig[typedKey] as any;
    }
  })

  return formConfigDb
}

export const convertIFeedbackDbToIFeedback = (feedback: IFeedbackDb): IFeedback => {
  return {
    _id: feedback._id.toString(),
    requestorUserId: feedback.requestorUserId.toString(),
    providerUserId: feedback.providerUserId.toString(),
    fromId: feedback.fromId.toString(),
    fields: feedback.fields,
    isAnonymous: feedback.isAnonymous,
    status: feedback.status,
    rejectedReason: feedback.rejectedReason,
    createdAt: feedback.createdAt.toString(),
    updatedAt: feedback.updatedAt.toString()
  }
}

export const convertIFeedbackToIFeedbackDb = (feedback: Partial<IFeedback>): Partial<IFeedbackDb> => {
  const conversionMap: { [key: string]: (value: any) => any } = {
    _id: convertToObjectId,
    requestorUserId: convertToObjectId,
    providerUserId: convertToObjectId,
    fromId: convertToObjectId,
    createdAt: stringToDate,
    updatedAt: stringToDate,
  }
  const feedbackDb: Partial<IFeedbackDb> = {}
  Object.keys(feedback).forEach((key) => {
    const typedKey = key as keyof IFeedback;
    if (feedback[typedKey] && conversionMap[typedKey]) {
      feedbackDb[typedKey] = conversionMap[typedKey](feedback[typedKey])
    } else if (feedback[typedKey]) {
      feedbackDb[typedKey as keyof IFeedback] = feedback[typedKey] as any;
    }
  })

  return feedbackDb
}