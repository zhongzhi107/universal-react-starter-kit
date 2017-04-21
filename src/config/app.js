export default {
  // The host on which the HTTP server should run.
  host: process.env.HOST,

  // The port on which the HTTP server should run.
  port: process.env.PORT,

  // The host on which the API server should run.
  apiHost: process.env.APIHOST,

  // The port on which the API server should run.
  apiPort: process.env.APIPORT,

  paths: {
    // Path to API mock server
    api: 'api',

    // Path to the public assets that will be served off the root of the
    // HTTP server.
    dist: 'prd',

    // Path to access logs
    logs: 'logs',

    // Path to tmp
    tmp: '.tmp'
  },

  globals: {
    __DISABLE_SOCKET__: false,
    // DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
    __DISABLE_SSR__: false,
    __DISABLE_HMR__: false,
    __DEVELOPMENT__: process.env.NODE_ENV === 'local'
  },

  proxies: {
    '^/api/(.*)': 'http://localhost:3030/$1'
  }
};
