import Koa from 'koa';
import Web from 'koa-static';

import api from './api/middleware';
import Static from './static/middleware';

const app = new Koa();
app.use(Static());
app.use(Web('build/www'));
app.use(api.routes(), api.allowedMethods());

app.listen(8400);

