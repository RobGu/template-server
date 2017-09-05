import Koa from 'koa';
import Logger from 'koa-logger';

import api from './server/middleware';
import Static from './static/middleware';
import Web from './web/middleware';

const app = new Koa();
app.use(Logger());
app.use(Static());
app.use(api.routes(), api.allowedMethods());
app.use(Web());

app.listen(8401);

