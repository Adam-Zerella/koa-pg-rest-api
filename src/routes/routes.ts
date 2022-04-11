import Router from '@koa/router';

import { ALLOWED_METHODS } from '@modules/koa/constants';

import todoRouter from './todo/routes';

const router = new Router({
  methods: ALLOWED_METHODS,
});

router.get('/health', (ctx) => (ctx.body = 'OK'));
router.use('/v1/todo', todoRouter.routes());

export default router;
