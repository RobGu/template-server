const file = require('koa-static');

module.exports = (path = 'static') => {
  return (ctx, next) => {
    const exp = new RegExp(`^/${path}/`);
    if (exp.test(ctx.path)) {
      return file('.')(ctx, next);
    }

    return next();
  };
};
