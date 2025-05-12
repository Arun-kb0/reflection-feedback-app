import httpStatus from '../constants/httpStatus'
import { ValidatorResponseType } from '../constants/types'
import HttpError from '../util/HttpError'


export const validateRequest = (
  args: Record<string, unknown>,
  types: Record<string, string | Function>,
  message?: string
) => {
  for (const key in types) {
    const expectedType = types[key];
    const actualValue = args[key];

    if (actualValue === undefined) {
      throw new HttpError(httpStatus.BAD_REQUEST, `${key} is required`);
    }

    if (typeof expectedType === "string") {
      // Validate basic types
      if (typeof actualValue !== expectedType) {
        throw new HttpError(
          httpStatus.BAD_REQUEST,
          `${key} must be of type ${expectedType}`
        );
      }
    } else if (typeof expectedType === "function") {
      // Check if the function is a utility validator like Array.isArray
      if (expectedType === Array.isArray) {
        if (!Array.isArray(actualValue)) {
          throw new HttpError(
            httpStatus.BAD_REQUEST,
            `${key} must be an array`
          );
        }
      } else if (!(actualValue instanceof expectedType)) {
        // Validate using instanceof for classes or constructors
        throw new HttpError(
          httpStatus.BAD_REQUEST,
          `${key} must be an instance of ${expectedType.name}`
        );
      }
    } else {
      throw new HttpError(
        httpStatus.BAD_REQUEST,
        `Invalid validation type for ${key}`
      );
    }
  }
};


// export const validateRequest = (
//   args: Record<string, unknown>,
//   types: Record<string, string | Function>,
//   message?: string
// ) => {

//   for (const key in types) {
//     const expectedType = types[key]
//     const actualValue = args[key]

//     if (
//       (typeof expectedType === "string" && typeof actualValue !== expectedType) ||
//       (typeof expectedType === "function" && !(actualValue instanceof expectedType))
//     ) {
//       // throw new HttpError(httpStatus.BAD_REQUEST, `${key} must be of type ${expectedType}`);
//       throw new HttpError(httpStatus.BAD_REQUEST, `${key} is required`);
//     }
//   }

// }


export const validateResponse = (res: ValidatorResponseType) => {
  if (!res || !res.data) {
    throw new HttpError(httpStatus.INTERNAL_SERVER_ERROR, 'No response')
  }
  if (res.error && res.statusCode) {
    throw new HttpError(res.statusCode, res.error)
  }
  if (res.error) {
    throw new HttpError(httpStatus.INTERNAL_SERVER_ERROR, res.error)
  }
}