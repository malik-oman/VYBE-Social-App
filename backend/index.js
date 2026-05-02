import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import loopRouter from './routes/loop.routes.js'
import storyRouter from './routes/story.routes.js'


// DOT ENV CONFIGURATION===================================
dotenv.config()

// MIDDLEWARES=====================================
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true,

}))

// API END POINTS===============================
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/loop', loopRouter)
app.use('/api/story', storyRouter)

// POST DEFINE ==================================================
const port = process.env.PORT || 5000


// SERVER STARTING POINT LISTNING==========================================
app.listen(port, () => { 
  connectDB()
  console.log('server started')
})