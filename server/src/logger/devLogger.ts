import winston, { format } from "winston";
import { CustomTransport } from "./customTransport";


const logFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level} ${stack || message }`
})


export const devLogger = () => {

  return winston.createLogger({
    level: 'info',
    defaultMeta: { service: 'reflection-app' },

    transports: [
      // * for file logging , dev or prod
      new CustomTransport({
        level: 'info',
        format: format.json()
      }),
      // * for logging to console
      new winston.transports.Console({
        format: format.combine(
          format.colorize({all: true}),
          format.timestamp({ format: 'YYYY-MM-DD HH-mm-ss' }),
          format.errors(logFormat)
        )
      })
    ]
  })

}