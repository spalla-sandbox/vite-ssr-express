import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { withLeadingSlash } from 'ufo';
import { createServer } from 'vite';
import { afterAll } from 'vitest';
import { start } from '../../server';
import { getPort } from '../../server/runtime/helpers/environment';

export function getServer(): Server {
  return start();
}

export function getServerPort() {
  return getPort();
}

export function serverUrl(route = '') {
  return `http://localhost:${getServerPort()}${withLeadingSlash(route)}`;
}

export async function startServer() {
  const root = path.resolve(__dirname, '../../');
  const vite = await createServer({
    root,
  });
  await vite.listen();
  return vite;
}

/**
 * Run the main appliction server in dev mode
 * @returns Page puppeteer instance and Express server instance
 */
export async function configurePageServer() {
  const server = getServer();
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  afterAll(async () => {
    await browser.close();
    await new Promise<void>((resolve, reject) => {
      if (!server.listening) resolve();
      server.closeAllConnections();
      server.close(error => (error ? reject(error) : resolve()));
    });
  });

  return { page, server };
}

/**
 * Run a Vite Dev Server thats render only the component
 * @param showConsole show console messages from client
 * @returns Page puppeteer instance and Vite Dev Server instance
 */
export async function configureComponentServer(showConsole = false) {
  const server = await startServer();
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const address = server.httpServer.address() as AddressInfo;
  await page.goto(`http://localhost:${address.port}`);

  if (showConsole) {
    page.on('console', msg =>
      // eslint-disable-next-line no-console
      console[msg.type()](
        'Message: ',
        msg.text(),
        '\n',
        'StatkTrace: ',
        msg.stackTrace(),
      ),
    );
  }

  afterAll(async () => {
    await browser.close();
    await new Promise<void>((resolve, reject) => {
      if (!server.httpServer.listening) resolve();
      server.close().then(resolve).catch(reject);
    });
  });

  return { page, server };
}
