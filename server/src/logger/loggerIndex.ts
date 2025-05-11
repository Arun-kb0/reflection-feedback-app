import { Logger } from 'winston'
import fs, { promises as fsPromises } from 'fs'
import { prodLogger } from './prodLogger'
import { devLogger } from './devLogger'
import { join } from 'path'
import corn from 'node-cron'

const CORN_EXPRESSION = process.env.CORN_EXPRESSION || '0 0 * * *'

const createDir = async () => {
  const curDir = process.cwd()
  const logDir = join(curDir, 'logs')
  if (!fs.existsSync(logDir)) {
    await fsPromises.mkdir(logDir)
  }
}

const clearLogDir = async () => {
  const curDir = process.cwd()
  const logDir = join(curDir, 'logs')
  if (fs.existsSync(logDir)) {
    await fsPromises.rm(logDir, { recursive: true, force: true })
  }
}

corn.schedule(CORN_EXPRESSION, async () => {
  console.log('Running corn job started')
  await clearLogDir()
  console.log('Running corn job finished')
}, { timezone: 'Asia/Kolkata' })


createDir()
let logger: Logger
if (process.env.NODE_ENV === 'prod') {
  logger = prodLogger()
} else {
  logger = devLogger()
}

export default logger