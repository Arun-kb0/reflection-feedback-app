import { Request, Response, NextFunction } from "express";
import IFeedbackController from "../interfaces/feedback/IFeedbackController";
import IFeedbackService from "../interfaces/feedback/IFeedbackService";
import IFeedback from "../interfaces/IFeedback";
import { validateRequest, validateResponse } from '../util/validator'
import httpStatus from "../constants/httpStatus";


class FeedbackController implements IFeedbackController {

  constructor(
    private feedbackService: IFeedbackService
  ) { }

  async createFeedback(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        requestorUserId, providerUserId, fromId,
        fields, isAnonymous, status, rejectedReason,
      } = req.body as Omit<IFeedback, '_id' | 'createdAt' | 'updatedAt'>

      validateRequest(
        {
          requestorUserId, providerUserId, fromId,
          fields, isAnonymous, status
        },
        {
          requestorUserId: "string", providerUserId: "string",
          fromId: "string", fields: Array.isArray,
          isAnonymous: "boolean", status: "string",
        }
      )
      const svcRes = await this.feedbackService.createFeedback(req.body)
      validateResponse(svcRes)
      res.status(httpStatus.OK).json(svcRes.data)
    } catch (error) {
      next(error)
    }
  }

  updateFeedback(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new Error("Method not implemented.");
  }

}

export default FeedbackController