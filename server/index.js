import express from 'express'
import { getPort } from './helpers/environment.js'
import defineHandlers from './handlers/index.js'

const port = getPort()

// Create http server
const app = express()

// Setup handlers
defineHandlers(app)

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
