import { Request , Response, NextFunction } from "express";
import IAuthController from "../interfaces/auth/IAuthController";
import IAuthService from "../interfaces/auth/IAuthService";

class AuthController implements IAuthController {

  constructor(
    private authService: IAuthService
  ) { }

  signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error("Method not implemented.");
  }

  login(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error("Method not implemented.");
  }

  logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error("Method not implemented.");
  }

}

export default AuthController