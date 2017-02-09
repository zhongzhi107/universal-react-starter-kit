export default {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,

  globals: {
    // DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
    __DISABLE_SSR__: false,
    __DEVELOPMENT__: process.env.NODE_ENV !== 'production',
  },

  proxies: {
    '^/api/(.*)': 'http://touch.qunar.com/api/$1'
  }
};
