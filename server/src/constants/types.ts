import httpStatus from '../constants/httpStatus'
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
