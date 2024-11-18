import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {

        const { name, email, password } = req.body
        if (!name || !email || !password) {
            res.status(400).json({ sucess: false, message: 'Invalid payload' })
            return
        }
        let data = {
            name,
            email,
            password: await bcrypt.hash(password, 10)
        }

        let user = new User(data)
        user.save()
        res.status(201).json({ sucess: true, message: 'User created' })
    }
    catch (err) {
        res.status(500).json({ sucess: false, message: 'Internal server problem' })
    }
}


export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).json({ sucess: false, message: 'Invalid payload' })
            return
        }
        // check user already exist
        let isUser = await User.findOne({ email })

        if (!isUser) {
            res.status(400).json({ sucess: false, message: 'Invalid payload' })
            return
        }

        // check password 
        let isPassword = await bcrypt.compare(password, isUser?.password as string)
        if (!isPassword) {
            res.status(400).json({ sucess: false, message: 'Invalid payload' })
            return
        }

        let token = jwt.sign({ id: isUser?._id, email }, process.env.SECRET as string, { expiresIn: '1H' })

        res.status(200).json({ sucess: true, message: 'User login successfully', data: { token } })

    }
    catch (err) {
        res.status(500).json({ sucess: false, message: 'Internal server problem' })
    }
}


export const getAllUser = async (req: Request, res: Response): Promise<void> => {
    try {
        let data = await User.find()
        res.status(201).json({ sucess: true, message: 'User Fetched', data })
    }
    catch (err) {
        res.status(500).json({ sucess: false, message: 'Internal server problem' })
    }
}
