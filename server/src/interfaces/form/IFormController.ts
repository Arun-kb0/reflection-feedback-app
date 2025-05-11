import { NextFunction, Request, Response } from "express"

interface IFormController {

  createFormConfig(req:Request, res: Response, next: NextFunction): Promise<void>
  findLatestFormConfig(req: Request, res: Response, next: NextFunction): Promise<void>

}

export default IFormController