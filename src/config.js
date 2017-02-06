require('babel-polyfill');

module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'react-universal-starter-kit',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: 'react-universal-starter-kit: %s',
      meta: [
        {name: 'description', content: 'All the modern best practices in one example.'},
        {charset: 'utf-8'}
      ]
    }
  },
  commonChunks: {
    vendor: [
      'react',
      'react-dom',
    ],
  },

};
