const Koa = require('koa');
const app = new Koa();

app.listen(4000, () => {
  console.log('heurm server is listening to port 4000');
});
