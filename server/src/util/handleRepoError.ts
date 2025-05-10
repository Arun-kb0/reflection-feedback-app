import mongoose from "mongoose";
import HttpError from "./HttpError";
import httpStatus from "../constants/httpStatus";

const handleRepoError = (error: any): never => {

  if (error instanceof mongoose.mongo.MongoServerError) {
    const { name, message, stack, code } = error

    switch (code) {
      case 11000:
        throw new HttpError(httpStatus.CONFLICT, `Duplicate key error: ${message}`)
      case 13:
        throw new HttpError(httpStatus.UNAUTHORIZED, `Unauthorized database access ${message}`)
      default:
        throw new HttpError(httpStatus.INTERNAL_SERVER_ERROR, message)
    }
  }

  if (error instanceof mongoose.Error.ValidationError) {
    throw new HttpError(httpStatus.BAD_REQUEST, error.message)
  }

  if (error instanceof mongoose.Error.CastError) {
    throw new HttpError(httpStatus.BAD_REQUEST, `Invalid ${error.path}: ${error.value}`)
  }

  throw new HttpError(httpStatus.INTERNAL_SERVER_ERROR, error.message)

}

export default handleRepoError