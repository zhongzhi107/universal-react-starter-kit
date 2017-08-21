export default {
  // Additional asset types to be supported for our bundles.
  // i.e. you can import the following file types within your source and the
  // webpack bundling process will bundle them with your source and create
  // URLs for them that can be resolved at runtime.
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
    'mp3'
  ],

  // return a Data Url if the file is smaller than a byte limit
  dataUrlLimit: 1,

  // Length of md5
  fileHashLength: 8,

  // Directory for JavaScript files output at building
  jsOutputDirectory: 'js',

  // Directory for style files output at building
  cssOutputDirectory: 'css',

  // Directory for image files output at building
  imageOutputDirectory: 'images',

  // Directory for fonts output at building
  fontOutputDirectory: 'fonts',

  // Configuration settings for the development vendor DLL.  This will be created
  // by our development server and provides an improved dev experience
  // by decreasing the number of modules that webpack needs to process
  // for every rebuild of our client bundle.  It by default uses the
  // dependencies configured in package.json however you can customise
  // which of these dependencies are excluded, whilst also being able to
  // specify the inclusion of additional modules below.
  commonChunks: {
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-router-scroll',
      'react-helmet',
      'redux-async-connect',
      'redux-form',
      'prop-types',
      'superagent',
      'serialize-javascript',
      'config',
      'redux/create',
      'helpers/ApiClient',
      // 'containers/App',
      // 'containers/NotFound'
    ]
  },

  // Path to the template used by HtmlWebpackPlugin to generate an offline
  // page that will be used by the service worker to render our application
  // offline.
  offlinePageTemplate: 'tools/offline-page/template.html',

  // Offline page file name.
  offlinePageFileName: 'index.html'
};
