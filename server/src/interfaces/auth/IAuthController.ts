import { Request, NextFunction, Response } from "express";

interface IAuthController {
  signup(req: Request, res: Response, next: NextFunction): Promise<void>
  login(req: Request, res: Response, next: NextFunction): Promise<void>
  logout(req: Request, res: Response, next: NextFunction): Promise<void>
}

export default IAuthController