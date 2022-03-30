import Router from '@koa/router';

import todoRouter from './todo/routes';

const router = new Router();

router.use('/v1/todo', todoRouter.routes());

export default router;
