import express from 'express'
const router = express.Router()
import { formController } from '../DI'

router.post('/create-form', formController.createFormConfig.bind(formController))

export default router