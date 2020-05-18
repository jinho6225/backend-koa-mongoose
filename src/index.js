
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const api = require('./api');


router.use('/api', api.routes());

app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.listen(4000, () => {
  console.log('koa server is working now');

});
