import express from 'express'
import { createUser, userLogin, getAllUser } from '../controllers/userController'
import { validateToken } from '../middleware/validateToken'

const router = express.Router()
router.get('/', validateToken, getAllUser)
router.post('/', createUser)
router.post('/login', userLogin)

export default router


