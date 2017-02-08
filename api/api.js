import Koa from 'koa';
import convert from 'koa-convert';
import session from 'koa-session';
import body from 'koa-body';
import PrettyError from 'pretty-error';
import {mapUrl} from 'utils/url';
import * as actions from 'actions';
import {environments} from '../src/config';

const {apiHost, apiPort} = environments;
const pretty = new PrettyError();
const app = new Koa();

app.use(convert(session(app)));
app.use(body());

app.use(async (ctx) => {
  const splittedUrlPath = ctx.url.split('?')[0].split('/').slice(1);
  const { action, params } = mapUrl(actions, splittedUrlPath);

  if (action) {
    try {
      const result = await action(ctx, params);
      if (result instanceof Function) {
        result(ctx);
      } else {
        ctx.body = JSON.stringify(result);
      }
    } catch (error) {
      if (error && error.redirect) {
        ctx.redirect(error.redirect);
      } else {
        console.error('API ERROR: ', pretty.render(error));
        ctx.status = error.status || 500;
        ctx.body = JSON.stringify(error);
      }
    }
  } else {
    ctx.status = 400;
  }
});

if (apiPort) {
  app.listen(apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', apiHost, apiPort);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
