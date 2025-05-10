import { NextFunction, Request, Response } from "express";
import logger from "../logger/loggerIndex";


const formatHttpLoggerResponse = (req: Request, res: Response, responseMessage?: string) => {
  const formattedData = {
    request: {
      method: req.method,
      url: `${req.baseUrl}${req.url}`,
      origin: req.headers.origin,
      host: req.headers.host,
      clientIp: req?.headers['x-forwarded-for'] || req.socket.remoteAddress
    },
    response: {
      headers: res.getHeaders(),
      statusCode: res.statusCode,
      responseMessage: responseMessage
    }
  }
  return formattedData
}


const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.log(
    'info',
    'httpLog',
    {
      logData: formatHttpLoggerResponse(req, res),
      filename: 'reflection-app.json.log'
    }
  )

  next()
}

export default httpLogger