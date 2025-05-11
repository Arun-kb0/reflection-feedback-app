import { Request, Response, NextFunction } from 'express'
import IFormController from '../interfaces/form/IFormController'
import IFormService from '../interfaces/form/IFormService'
import { validateRequest, validateResponse } from '../util/validator'
import httpStatus from '../constants/httpStatus'
import IFormConfig from '../interfaces/IFormConfig'

class FormController implements IFormController {

  constructor(
    private formService: IFormService
  ) { }

  async createFormConfig(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        name, fields, isAnonymousAllowed,
        recallTimeFrame: { days, hours },
        requestLimits: { maxRequestPerUser, rollingWindowDays },
        effectiveFrom,
      } = req.body as Omit<IFormConfig, '_id' | 'createdAt' | 'updatedAt'>

      validateRequest(
        {
          name, fields, isAnonymousAllowed,
          days, hours,
          maxRequestPerUser, rollingWindowDays,
          effectiveFrom,
        },
        {
          name: "string", fields: Array.isArray,
          isAnonymousAllowed: "boolean",
          days: "number", hours: "number",
          maxRequestPerUser: "number", rollingWindowDays: "number",
          effectiveFrom: "string",
        }
      ) 

      const svcRes = await this.formService.createFormConfig(req.body)
      validateResponse(svcRes)
      res.status(httpStatus.OK).json(svcRes.data)
    } catch (error) {
      next(error)
    }
  }

  async findLatestFormConfig(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const svcRes = await this.formService.findLatestFormConfig()
      validateResponse(svcRes)
      res.status(httpStatus.OK).json(svcRes.data)
    } catch (error) {
      next(error)
    }
  }



}

export default FormController