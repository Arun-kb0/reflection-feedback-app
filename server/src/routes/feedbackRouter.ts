import express from 'express'
const router = express.Router()
import { feedbackController } from '../DI'

router.post('/', feedbackController.createFeedback.bind(feedbackController))

export default router