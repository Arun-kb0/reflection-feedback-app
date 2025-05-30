import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import cors from 'cors'
import connectDb from './config/connectDb'
import corsOptions from './config/corsOptions'
import httpLogger from './middleware/httpLogger'
import errorHandler from './middleware/errorHandler'
import httpStatus from './constants/httpStatus'
import authorize from './middleware/authorize'
import authRouter from './routes/authRouter'
import formRoutesAdmin from './routes/formRoutesAdmin'
import formRouts from './routes/formRouts'
import userRouter from './routes/userRouter'
import feedbackRouter from './routes/feedbackRouter'


const PORT = process.env.PORT || 3001
const MONGO_DB_URI = process.env.MONGO_DB_URI || ''

const app = express()
app.use(cors(corsOptions))
app.use(express.json())

app.use(httpLogger)

app.get('/test', (req: Request, res: Response) => {
  res.json({ message: 'test route: server is running' })
})


app.use('/auth', authRouter)

app.use('/form', authorize, formRouts)
app.use('/user', authorize, userRouter)
app.use('/feedback', authorize, feedbackRouter)


app.use('/admin/form/', authorize, formRoutesAdmin)


app.get('*', (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({ message: 'router not found' })
})

app.use(errorHandler)

connectDb(MONGO_DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch(error => console.log(error))