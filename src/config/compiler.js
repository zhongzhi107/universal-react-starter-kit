export default {
  dist: 'dist',
  fileHashLength: 8,
  jsOutputDirectory: 'js',
  cssOutputDirectory: 'css',
  commonChunks: {
    vendor: [
      'react',
      'react-dom',
    ],
  },
};
