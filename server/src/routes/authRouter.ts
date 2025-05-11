import express from 'express'
const router = express.Router()
import { authController } from '../DI'

router.post('/signup', authController.signup.bind(authController))
router.post('/login', authController.login.bind(authController))
router.get('/logout', authController.logout.bind(authController))

export default router