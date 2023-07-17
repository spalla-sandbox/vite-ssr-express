import express from 'express';
import { isDevelopment, isProduction } from '../helpers/environment.js';
import developmentHandler from './devHandler.js';
import productionHandler from './prodHandler.js';

export default async function defineHandlers(app) {
  if (isDevelopment()) {
    app.use('*', await developmentHandler(app))
  }

  if (isProduction()) {
    app.use('/assets', express.static('output/client/assets'))
    app.use('*', await productionHandler(app))
  }
}