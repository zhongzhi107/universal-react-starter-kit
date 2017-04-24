#!/usr/bin/env babel-node

import path from 'path';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import piping from 'piping';
import { appConfig } from 'config';
import witConfig from '../webpack/webpack-isomorphic-tools';

/**
 * Define isomorphic constants.
 */
const { globals } = appConfig;
global.__CLIENT__ = false;
global.__SERVER__ = true;
// DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DISABLE_SSR__ = globals.__DISABLE_SSR__;
global.__DEVELOPMENT__ = globals.__DEVELOPMENT__;
global.__DISABLE_SOCKET__ = globals.__DISABLE_SOCKET__;

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
