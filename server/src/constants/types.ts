import httpStatus from '../constants/httpStatus'
import IFeedback from '../interfaces/IFeedback'
import IUser from '../interfaces/IUser'

export type ServiceReturnNoPromiseType<T> = {
  data: T | undefined
  error: string | undefined
  statusCode: httpStatus | undefined
}

export type ServiceReturnType<T> = Promise<{
  data: T | undefined
  error: string | undefined
  statusCode: httpStatus | undefined
}>

export type ResponseType = {
  data: any | undefined
  error: string | undefined
  statusCode: httpStatus | undefined
}

export type AuthResType = {
  user: IUser
  accessToken: string
}

export type ValidatorResponseType = {
  data: any | undefined
  error: string | undefined
  statusCode: httpStatus | undefined
}

export type UserPaginationType = {
  users: IUser[]
  currentPage: number
  numberOfPages: number
}

export type FeedbackPaginationType = {
  feedbacks: IFeedback[]
  currentPage: number
  numberOfPages: number
}

