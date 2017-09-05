const Koa = require('koa');
const api = require('./api/middleware');
const Static = require('./static/middleware');
const Web = require('koa-static');

const app = new Koa();
app.use(Static());
app.use(Web('www'));
app.use(api.routes(), api.allowedMethods());

app.listen(8400);

