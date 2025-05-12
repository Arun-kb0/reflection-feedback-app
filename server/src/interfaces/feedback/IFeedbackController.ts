import { NextFunction, Request, Response } from "express"


interface IFeedbackController {

  createFeedback(req: Request, res: Response, next: NextFunction): Promise<void>
  updateFeedback(req: Request, res: Response, next: NextFunction): Promise<void>

}

export default IFeedbackController