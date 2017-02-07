import webpackDevMiddleware from 'webpack-dev-middleware';
import applyExpressMiddleware from './apply-express-middleware';

export default function (compiler, options) {
  const middleware = webpackDevMiddleware(compiler, options);

  return async (ctx, next) => {
    const hasNext = await applyExpressMiddleware(middleware, ctx.req, {
      end: content => (ctx.body = content),
      setHeader: (...args) => {
        ctx.set(...args);
      }
    });

    if (hasNext) {
      await next();
    }
  };
}
