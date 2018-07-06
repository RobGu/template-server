import {
  body,
  description,
  request,
  responses,
  summary,
  tagsAll,
} from 'koa-swagger-decorator';

const userSchema = {
  // https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#parameterObject
  name: { type: 'string', required: true, maximum: 100 },
  password: { type: 'string', required: true },
};

@tagsAll(['User'])
export default class Users {
  @request('get', '/bar')
  @summary('user login, password is 123456')
  @description('example of api')
  static async bar(ctx) {
    ctx.body = 'this is a users response!';
  }

  @request('post', '/foo/{id}')
  @body(userSchema)
  @responses({
    200: {
      schema: {
        type: 'object',
        properties: userSchema,
      },
      description: 'xxx',
    },
  })

  static async foo(ctx) {
    ctx.body = 'this is a users/bar response';
  }
}
