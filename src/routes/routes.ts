import Router from '@koa/router';

// import route404 from './404';
import todoRouter from './todo/routes';

const router = new Router();

router.use('/v1/todo', todoRouter.routes());

// /**
//  * Match anything except `/` that doesn't begin with a version prefix `/v1`. This is useful to
//  * be a catch-all route
//  */
// router.all(/[^\/v1]/, route404);

export default router;
