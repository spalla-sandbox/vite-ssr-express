import express from 'express';
import { getPort } from './runtime/helpers/environment.js';
import defineHandlers from './runtime/index.js';

export function start() {
  // Server port
  const port = getPort();

  // Create http server
  const app = express();

  // Setup handlers
  defineHandlers(app);

  // Start http server
  return app
    .listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server started at http://localhost:${port}`);
    })
    .on('error', e => {
      // eslint-disable-next-line no-console
      console.error('Cannot start server: ', e.message);
    });
}

const args = process.argv.slice(2);

if (args.includes('--run')) {
  start();
}
