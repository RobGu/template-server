const Koa = require('koa');
const Web = require('./web/middleware');
const api = require('./api/middleware');
const Static = require('./static/middleware');

const app = new Koa();
app.use(Static());
app.use(api.routes(), api.allowedMethods());
app.use(Web());

app.listen(8400);

