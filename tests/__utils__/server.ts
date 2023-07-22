/* eslint-disable @typescript-eslint/ban-ts-comment */
import { withLeadingSlash } from 'ufo';
// @ts-ignore
import { server } from '../../server';
// @ts-ignore
import { getPort } from '../../server/runtime/helpers/environment';

export function getServer() {
  return server;
}

export function getServerPort() {
  return getPort();
}

export function serverUrl(path = '') {
  return `http://localhost:${getServerPort()}${withLeadingSlash(path)}`;
}
