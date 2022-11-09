const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const { errorMiddleware } = require('./middlewares/errorMiddleware')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

connectDB()

app.get('/', (req, res) => {
  res.send('Welcome!')
})

app.use('/auth', require('./routes/userRoutes'))

app.use(errorMiddleware)

app.listen(PORT, () => console.log(`Server running on port ${ PORT }`))
