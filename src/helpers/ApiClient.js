import superagent from 'superagent';
// import axios from 'axios'
import {host, port} from 'config/environments';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path.startsWith('/') ? path : `/${path}`;

  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return `http://${host}:${port}/api${adjustedPath}`;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return `/api${adjustedPath}`;
}

export default class ApiClient {
  constructor(ctx) {
    methods.forEach((method) => {
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        console.log('-----------formatUrl(path):', formatUrl(path));
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && ctx.cookie) {
          request.set('cookie', ctx.cookie);
        }

        if (data) {
          request.send(data);
        }

        // eslint-disable-next-line
        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      });
    });
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  // eslint-disable-next-line
  empty() {}
}
