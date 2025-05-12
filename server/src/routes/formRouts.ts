import express from 'express'
const router = express.Router()
import { formController } from '../DI'

router.get('/latest-form', formController.findLatestFormConfig.bind(formController))

export default router