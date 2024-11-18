import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import userRouter from './routes/userRoutes'
const app = express()

app.use(express.json())
app.use('/user', userRouter)

mongoose.connect(process.env.DB_URL as string)
    .then(() => console.log('db connected'))
    .catch((err) => console.log(err))

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server is starting at port:${PORT}`))


