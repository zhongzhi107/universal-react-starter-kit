require('babel-polyfill');

module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'universal-react-starter-kit',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: 'universal-react: %s',
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
