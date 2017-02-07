import webpackHotMiddleware from 'webpack-hot-middleware';
import applyExpressMiddleware from './apply-express-middleware';

export default function (compiler, options) {
  const middleware = webpackHotMiddleware(compiler, options);
  return async (ctx, next) => {
    const hasNext = await applyExpressMiddleware(middleware, ctx.req, ctx.res);

    if (hasNext && next) {
      await next();
    }
  };
}
