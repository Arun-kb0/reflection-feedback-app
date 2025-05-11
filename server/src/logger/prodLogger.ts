import winston, { format } from "winston";
import { CustomTransport } from "./customTransport";

export const prodLogger = () => {

  return winston.createLogger({
    level: "http",
    defaultMeta: { service: 'reflection-app' },

    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json()
    ),
    transports: [
      new CustomTransport({
        level: 'info',
        format: format.json()
      }),
      new winston.transports.Console({
        level: 'http'
      })
    ]
  })

}