import { Request, Response, NextFunction } from "express";
import IUserController from "../interfaces/user/IUserController";
import { validateRequest, validateResponse } from '../util/validator'
import IUserService from "../interfaces/user/IUserService";
import httpStatus from "../constants/httpStatus";

class UserController implements IUserController {

  constructor(
    private userService: IUserService
  ) { }

  async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page } = req.query
      validateRequest({ page: Number(page) }, { page: "number" })
      const svcRes = await this.userService.getUsers(Number(page))
      validateResponse(svcRes)
      res.status(httpStatus.OK).json(svcRes.data)
    } catch (error) {
      next(error)
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params
      validateRequest({ userId }, { userId: "String" })
      const svcRes = await this.userService.getUser(userId)
      validateResponse(svcRes)
      res.status(httpStatus.OK).json(svcRes.data)
    } catch (error) {
      next(error)
    }
  }

}

export default UserController