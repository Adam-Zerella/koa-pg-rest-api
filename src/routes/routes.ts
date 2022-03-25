import Router from '@koa/router';

import todoRouter from './todo/routes';

const router = new Router({ prefix: '/v1' });

router.use('/todo', todoRouter.routes());

export default router;
