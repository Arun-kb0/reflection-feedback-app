import express from 'express'
const router = express.Router()
import { userController } from '../DI'

router.get('/', userController.getUsers.bind(userController))
router.get('/:userId', userController.getUser.bind(userController))

export default router