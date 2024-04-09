require('express-async-errors')

const migrationsRun = require('./database/sqlite/migrations')
const AppError = require('./utils/AppError')

const express = require('express')
const routes = require('./routes')
const app = express()

migrationsRun()

app.use(express.json())
app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  return response.status(500).json({
    message: 'Internal server error',
  })
})

app.listen(3333, () => {
  console.log('Server is running on port 3333')
})