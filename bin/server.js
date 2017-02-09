#!/usr/bin/env babel-node

import path from 'path';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import piping from 'piping';
import witConfig from '../webpack/webpack-isomorphic-tools';
import {globals} from '../src/config/environments';

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
// DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DISABLE_SSR__ = globals.__DISABLE_SSR__;
global.__DEVELOPMENT__ = globals.__DEVELOPMENT__;

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
