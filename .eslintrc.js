module.exports =  {
  parser: 'babel-eslint',
  extends: 'eslint-config-airbnb',
  env: {
    browser: true,
    node: true
  },
  rules: {
    'comma-dangle': 0,  // not sure why airbnb turned this on. gross!
    'global-require': 0,
    'indent': [2, 2, { SwitchCase: 1 }],
    'new-cap': [2, { capIsNewExceptions: ['List', 'Map', 'Set'] }],
    'no-alert': 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-underscore-dangle': 0,
    'import/default': 0,
    'import/extensions': 0,
    'import/named': 0,
    'import/namespace': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/no-danger': 0,
    'react/prefer-stateless-function': 0,
    'react/require-default-props': 0,
    'require-jsdoc': 2
  },
  plugins: ['react', 'import'],
  settings: {
    'import/parser': 'babel-eslint',
    'import/resolve': {
      moduleDirectory: ['node_modules', 'src']
    }
  },
  globals: {
    __DEVELOPMENT__: true,
    __CLIENT__: true,
    __SERVER__: true,
    __DISABLE_SSR__: true,
    __DISABLE_SOCKET__: true,
    __DEVTOOLS__: true,
    socket: true,
    webpackIsomorphicTools: true
  }
};
