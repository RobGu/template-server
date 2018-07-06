import Router from 'koa-router'
import { wrapper } from 'koa-swagger-decorator'

import Users from './users'

const router = Router()
wrapper(router)
router.prefix("/api")
router.swagger({
  prefix: '/api',
  swaggerHtmlEndpoint: '/swagger-html',
  swaggerJsonEndpoint: '/swagger-json',
  title: 'Server',
  description: 'API DOC',
  version: '1.0.0',
});

router.map(Users)
export default router
