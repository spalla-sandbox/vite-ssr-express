/**
 * Center predefined redirects
 * {
 *   <route>: <route to redirect> || [<route to redirect>, <optional status code>]
 * }
 *
 * When no status code is provided, 302 is used by default
 */
export default {
  '/redirecionar-2': '/',
  '/redirecionar': ['/entrar', 301],
};
