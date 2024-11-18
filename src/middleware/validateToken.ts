import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { userPayload } from '../types/user'

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization
        if (!token) {
            res.status(400).json({ success: false, message: 'token is required' })
            return
        }

        let decode = jwt.verify(token, process.env.SECRET as string) as userPayload

        if (!decode) {
            res.status(403).json({ success: false, message: 'invalid token' })
            return
        }
        req.user = decode
        next()
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Internal server problem' })
    }
}