import { NextFunction, Request, Response } from "express"


interface IUserController {

  getUsers(req: Request, res: Response, next: NextFunction): Promise<void> 
  getUser(req: Request, res: Response, next: NextFunction): Promise<void> 

}

export default IUserController