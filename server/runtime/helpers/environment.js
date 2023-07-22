export function isProduction() {
  return process.env.NODE_ENV === 'production'
}

export function isDevelopment() {
  return process.env.NODE_ENV !== 'production'
}

export function getBaseURL() {
  return process.env.BASE_URL || '/'
}

export function getPort() {
  return process.env.PORT || 5173
}
