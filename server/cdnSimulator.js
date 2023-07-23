import express from 'express';

/**
 * Simulates a CND server
 */
export default function simulateCDN() {
  const cndServer = express();
  cndServer.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
  cndServer.use('/assets', express.static('output/client/assets'));
  cndServer.listen(4000, () => {
    // eslint-disable-next-line no-console
    console.log(`Local CDN running at http://localhost:${4000}`);
  });
}
