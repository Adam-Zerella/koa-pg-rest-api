// import log from '@modules/log';

import type { Context, Next } from 'koa';

// const logger = log.getLogger('NoRouteMiddleware');

/**
 * Catches the routes not found and returns a JSON response.
 */
export default function routeNotFoundMiddleware() {
  return async function (ctx: Context, next: Next) {
    await next();

    const { status, body } = ctx;

    if (status === 404 && body === undefined) {
      // logger.debug({ ctx }, 'Caught request for unknown route');

      ctx.status = 404;
      ctx.body = {
        error: 'No route here',
      };
    }
  };
}
