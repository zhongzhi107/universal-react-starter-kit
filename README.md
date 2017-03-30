<div align="center">
<img src="https://github.com/zhongzhi107/universal-react-starter-kit/blob/master/static/images/touch/logo_144.png?raw=true" width="144" alt="Universal React Starter Kit" />
<h1>Universal React Starter Kit</h1>
</div>

Universal React Starter Kit is an universal web application framework using [koa](https://koajs.com/), [react](https://github.com/facebook/react), [redux](https://github.com/reactjs/redux) and [webpack](https://github.com/webpack/webpack).

[![Build status](https://ci.appveyor.com/api/projects/status/xmypn7o4togy04c1?svg=true)](https://ci.appveyor.com/project/zhongzhi107/universal-react-starter-kit)
[![Dependency Status](https://david-dm.org/zhongzhi107/universal-react-starter-kit.svg)](https://david-dm.org/zhongzhi107/universal-react-starter-kit)
[![devDependency Status](https://david-dm.org/zhongzhi107/universal-react-starter-kit/dev-status.svg)](https://david-dm.org/zhongzhi107/universal-react-starter-kit#info=devDependencies)
[![Known Vulnerabilities](https://snyk.io/test/github/zhongzhi107/universal-react-starter-kit/badge.svg)](https://snyk.io/test/github/zhongzhi107/universal-react-starter-kit)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/zhongzhi107/universal-react-starter-kit/master/LICENSE)

## Features
Really starter boilerplate with the most popular technologies:

* [x] [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9#.aug1ngj77) rendering, dynamic routing, async redux reducers, async data fetching and code-splitting.
* [x] [React](https://facebook.github.io/react/) as the view.
* [x] [React Router](https://github.com/reactjs/react-router) as the router.
* [x] [Redux](https://github.com/reactjs/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation.
* [ ] [Immutable-js](https://facebook.github.io/immutable-js/) provides persistent data collections which increase efficiency and simplicity.
* [x] [koa](https://koajs.com/) server.
* [x] [Webpack 2](https://webpack.js.org/) for bundling and [**"Tree-Shaking"**](http://www.2ality.com/2015/12/webpack-tree-shaking.html) support.
* [x] [Babel](https://babeljs.io/) for ES6 and ES7 transpiling.
* [ ] [React Hot Loader 3](https://github.com/gaearon/react-hot-loader) to tweak React components in real time.
* [x] [redux-thunk](https://github.com/gaearon/redux-thunk) as the middleware to deal with asynchronous action.
* [x] [react-router-redux](https://github.com/reactjs/react-router-redux) to keep your router in sync with Redux state.
* [x] [react-helmet](https://github.com/nfl/react-helmet) to manage title, meta, styles and scripts tags on both server and client.
* [x] [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) to allow require() work for statics both on client and server.
* [x] [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html) serves the files emitted from webpack over the Express server.
* [x] [Webpack Hot Middleware]() allows you to add hot reloading into the Express server.
* [ ] [react-addons-shallow-compare](https://facebook.github.io/react/docs/shallow-compare.html) for a performance boost, it works perfectly with immutable data structure.
* [x] [morgan](https://github.com/koa-modules/morgan) the HTTP request logger for server side debugging.
* [x] [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension) for next generation developer experience.
* [x] [ESLint](http://eslint.org/) to maintain a consistent javascript code style (Airbnb's code style).
* [x] [StyleLint](http://stylelint.io/) to maintain a consistent css/less code style.
* [x] CSS and LESS support with [PostCSS] (https://github.com/postcss/postcss-loader) for advanced transformations (e.g. autoprefixer). [CSS Modules](https://github.com/css-Modules/css-Modules) enabled.
* [x] Image (with [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) for optimizing) and Font support.
* [x] Split vendor's libraries from client bundle.
* [x] No other view engines, just javascript based HTML rendering template.
* [x] Shared app config between development and production.
* [x] 404 error page and redirect handling.
* [ ] [karma](https://karma-runner.github.io/1.0/index.html), [mocha](https://mochajs.org/), [enzyme](https://github.com/airbnb/enzyme), [chai](http://chaijs.com/) and [sinon](https://github.com/sinonjs/sinon) as the integrated solution for writing unit tests.
* [ ] Testing code coverage support.
* [ ] [Happypack](https://github.com/amireh/happypack) for build performance.
* [x] Auto open chrome window when service start.
* [ ] Code splitting
  * [ ] Extract text plugin with code splitting
  * [ ] Code splitting for redux-modules
* [x] Progressive Web Application ready, with offline support, via a Service Worker.
* [x] Optimized configuration file structure
* [ ] [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard)
* [ ] Quick scaffolding - Create components, containers, routes from the CLI!
* [x] [DllPlugin](http://webpack.github.io/docs/list-of-plugins.html#dllplugin) to improve compiler performance

## Requirements

* [node](https://nodejs.org/en/) >= 4.0
* [npm](https://www.npmjs.com/) >= 3.0


## Getting Started

  ```
  git clone https://github.com/zhongzhi107/universal-react-starter-kit my-project
  cd my-project
  cp profiles/local.env .env
  yarn
  yarn run serve
  ```

  Or, if you aren't using [yarn](https://yarnpkg.com/):

  ```
  git clone https://github.com/zhongzhi107/universal-react-starter-kit my-project
  cd my-project
  cp profiles/local.env .env
  npm install
  npm run serve
  ```

  Now the app should be running at http://localhost:3000/

  ## Commands
  ```
  # Build the project
  yarn build

  # Build the project with CDN_ROOT
  CDN_ROOT=//mycdn.com/ yarn build

  # Test
  yarn test

  # JavaScript lint
  yarn run lint

  # CSS lint
  yarn run lint:style

  # Build "dll" bundles
  yarn run dll
  ```
