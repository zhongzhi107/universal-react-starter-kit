#!/usr/bin/env babel-node

import path from 'path';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import piping from 'piping';
import witConfig from '../webpack/webpack-isomorphic-tools';

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  piping({
    hook: true,
    ignore: /(\/\.|~$|\.json|\.scss$)/i
  });
}

const root = path.resolve(__dirname, '..');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
global.webpackIsomorphicTools =
new WebpackIsomorphicTools(witConfig).server(root, () => {
  require('../src/server');
});
