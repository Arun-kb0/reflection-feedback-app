import { Request, Response, NextFunction } from "express";
import IAuthController from "../interfaces/auth/IAuthController";
import IAuthService from "../interfaces/auth/IAuthService";
import httpStatus from "../constants/httpStatus";
import { validateRequest, validateResponse } from "../util/validator";
import IUser from "../interfaces/IUser";

class AuthController implements IAuthController {

  constructor(
    private authService: IAuthService
  ) { }

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, firstName, lastName, department, designation } = req.body
      validateRequest(
        { email, password, firstName, lastName, department, designation },
        {
          email: 'string',
          password: 'string',
          firstName: 'string',
          lastName: 'string',
          department: 'string',
          designation: 'string'
        },
      )
      const user: Pick<IUser, "email" | "password" | "profile"> = {
        email,
        password,
        profile: {
          firstName,
          lastName,
          department,
          designation
        }
      }
      const svcRes = await this.authService.signup(user)
      validateResponse(svcRes)
      res.status(httpStatus.OK).json(svcRes.data)
    } catch (error) {
      next(error)
    }
  }

  login(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error("Method not implemented.");
  }

  logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error("Method not implemented.");
  }

}

export default AuthController