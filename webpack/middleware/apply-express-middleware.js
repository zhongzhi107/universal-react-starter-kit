// Based on: https://github.com/dayAlone/koa-webpack-hot-middleware/blob/master/index.js
export default (fn, req, res) => {
  const originalEnd = res.end;

  return new Promise((resolve) => {
    res.end = (...args) => {
      originalEnd(...args);
      resolve(false);
    };
    fn(req, res, () => {
      resolve(true);
    });
  });
};
