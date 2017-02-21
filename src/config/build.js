export default {
  assetTypes: [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'ico',
    'eot',
    'svg',
    'ttf',
    'woff',
    'woff2',
    'otf',
  ],

  fileHashLength: 8,

  jsOutputDirectory: 'js',

  cssOutputDirectory: 'css',

  commonChunks: {
    vendor: [
      'react',
      'react-dom',
    ],
  },

  // Path to the template used by HtmlWebpackPlugin to generate an offline
  // page that will be used by the service worker to render our application
  // offline.
  offlinePageTemplate: 'tools/offline-page/template.html',

  // Offline page file name.
  offlinePageFileName: 'index.html',
};
