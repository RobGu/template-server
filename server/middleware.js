import Router from 'koa-router';

const router = new Router();
router.get('/api', (ctx) => {
  ctx.body = {
    api: 'success',
  };
});

export default router;
