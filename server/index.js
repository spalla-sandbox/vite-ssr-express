import express from 'express'
import developmentHandler from './handlers/devHandler.js'
import productionHandler from './handlers/prodHandler.js'
import { getPort } from './helpers/environment.js'

const port = getPort()

// Create http server
const app = express()

// Serve HTML
app.use('*', await developmentHandler(app), await productionHandler(app))

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
