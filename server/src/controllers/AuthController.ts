import { Request, Response, NextFunction } from "express";
import IAuthController from "../interfaces/auth/IAuthController";
import IAuthService from "../interfaces/auth/IAuthService";
import httpStatus from "../constants/httpStatus";
import { validateRequest, validateResponse } from "../util/validator";
import IUser from "../interfaces/IUser";
import { validate } from "node-cron";

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

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body
      validateRequest(
        { email, password },
        { email: "string", password: "string" }
      )
      const svcRes = await this.authService.login(email, password)
      validateResponse(svcRes)
      res.status(httpStatus.OK).json(svcRes.data)
    } catch (error) {
      next(error)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { accessToken } = req.query
      validateRequest(
        { accessToken },
        { accessToken: "string" }
      )
      const svcRes = await this.authService.logout(accessToken as string)
      validateResponse(svcRes)
      res.status(httpStatus.OK).json(svcRes.data)
    } catch (error) {
      next(error)
    }
  }

}

export default AuthController