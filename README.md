# React Universal Starter Kit
React Universal Starter Kit is an universal web application framework using express, react, redux and webpack.

## Features
Really starter boilerplate with the most popular technologies:

* [ ][Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9#.aug1ngj77) rendering, dynamic routing, async redux reducers, async data fetching and code-splitting.
* [ ][React](https://facebook.github.io/react/) as the view.
* [ ][React Router](https://github.com/reactjs/react-router) as the router.
* [ ][Redux](https://github.com/reactjs/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation.
* [ ][Immutable-js](https://facebook.github.io/immutable-js/) provides persistent data collections which increase efficiency and simplicity.
* [ ][Express](https://expressjs.com/) server.
* [ ][Webpack 2](https://webpack.js.org/) for bundling and [**"Tree-Shaking"**](http://www.2ality.com/2015/12/webpack-tree-shaking.html) support.
* [ ][Babel](https://babeljs.io/) for ES6 and ES7 transpiling.
* [ ][React Hot Loader 3](https://github.com/gaearon/react-hot-loader) to tweak React components in real time.
* [ ][nodemon]() to monitor for any changes in your node.js application and automatically restart the server.
* [ ][axios](https://github.com/mzabriskie/axios) for universal data fetching/rehydration on the client.
* [ ][redux-thunk](https://github.com/gaearon/redux-thunk) as the middleware to deal with asynchronous action.
* [ ][react-router-redux](https://github.com/reactjs/react-router-redux) to keep your router in sync with Redux state.
* [ ][react-helmet](https://github.com/nfl/react-helmet) to manage title, meta, styles and scripts tags on both server and client.
* [ ][webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) to allow require() work for statics both on client and server.
* [ ][Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html) serves the files emitted from webpack over the Express server.
* [ ][Webpack Hot Middleware]() allows you to add hot reloading into the Express server.
* [ ][react-addons-shallow-compare](https://facebook.github.io/react/docs/shallow-compare.html) for a performance boost, it works perfectly with immutable data structure.
* [ ][morgan](https://github.com/expressjs/morgan) the HTTP request logger for server side debugging.
* [ ][Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension) for next generation developer experience.
* [ ][ESLint](http://eslint.org/) to maintain a consistent javascript code style (Airbnb's code style).
* [ ][StyleLint](http://stylelint.io/) to maintain a consistent css/scss code style.
* [ ]CSS and SASS support with [PostCSS](https://github.com/postcss/postcss-loader) for advanced transformations (e.g. autoprefixer). [CSS Modules](https://github.com/css-Modules/css-Modules) enabled.
* [ ]Image (with [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) for optimizing) and Font support.
* [ ]Split vendor's libraries from client bundle.
* [ ]No other view engines, just javascript based HTML rendering template.
* [ ]Shared app config between development and production.
* [ ]404 error page and redirect handling.
* [ ][karma](https://karma-runner.github.io/1.0/index.html), [mocha](https://mochajs.org/), [enzyme](https://github.com/airbnb/enzyme), [chai](http://chaijs.com/) and [sinon](https://github.com/sinonjs/sinon) as the integrated solution for wrting unit tests.
* [ ]Testing code coverage support.
* [ ]Happypack


## Requirements

* [node](https://nodejs.org/en/) >= 4.0
* [npm](https://www.npmjs.com/) >= 3.0


## Getting Started

1. You can start by clone the repository on your local machine by running:

```
git clone https://github.com/zhongzhi107/ibaodong/cms.git
cd cms
```

2. Install all of the npm packages:

```
yarn install
```

3. Start to run it:

```
# development
yarn run serve    # Building bundle and running development server
```

Now the app should be running at http://localhost:3000/

or start production server

```
# production
yarn run serve:dist
```

Now the app should be running at http://localhost:8080/
