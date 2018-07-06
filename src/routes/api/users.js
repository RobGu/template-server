import {
  body,
  description,
  middlewares,
  path,
  request,
  summary,
  tags
} from 'koa-swagger-decorator'

const tag = tags(['User']);
const userSchema = {
  name: { type: 'string', required: true },
  password: { type: 'string', required: true },
};

export default class Users {
  @request('get', '/bar')
  @summary('user login, password is 123456')
  @description('example of api')
  @tag
  static async bar(ctx, next) {
    ctx.body = 'this is a users response!'
  }

  @request('post', '/foo')
  @body(userSchema)
  static async foo(ctx, next) {
    ctx.body = 'this is a users/bar response'
  }
}
