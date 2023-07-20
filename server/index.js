import express from 'express'
import { getPort } from './runtime/helpers/environment.js'
import defineHandlers from './runtime/index.js'

const port = getPort()

// Create http server
const app = express()

// Setup handlers
defineHandlers(app)

// Start http server
export const server = app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
