export default {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,

  globals: {
    //   '__CLIENT__' = false;
    // global.__SERVER__ = true;
    __DISABLE_SSR__: false,  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
    __DEVELOPMENT__: process.env.NODE_ENV !== 'production',
  },

  proxies: {
    '^/api/(.*)': 'http://touch.qunar.com/api/$1'
  }
};
