import simulateCDN from '../cdnSimulator.js';
import developmentHandler from './handlers/devHandler.js';
import productionHandler from './handlers/prodHandler.js';
import { isDevelopment, isProduction } from './helpers/environment.js';

/**
 * Define request handle by environment
 * @param {Express} app Express instance
 */
export default async function defineHandlers(app) {
  if (isDevelopment()) {
    app.use('*', await developmentHandler(app));
  }

  if (isProduction()) {
    simulateCDN();
    app.use('*', await productionHandler(app));
  }
}
