import { Context, Next } from 'koa';

import log from '@modules/log';

const logger = log.getLogger('NoRouteMiddleware');

/**
 * Catches the routes not found and returns a JSON response.
 */
export default function routeNotFoundMiddleware() {
  return async function (ctx: Context, next: Next) {
    const { status, body } = ctx;

    logger.debug({ ctx }, 'Caught request for unknown route');

    if (status === 404 && body === undefined) {
      ctx.status = 404;
      ctx.body = {
        error: 'No route here',
      };
    }

    await next();
  };
}
