import { server } from '../../server'
import { getPort } from '../../server/helpers/environment';

export function getServer() {
  return server;  
}

export function getServerPort() {
  return getPort()
}

export function serverUrl() {
  return `http://localhost:${getServerPort()}`
}