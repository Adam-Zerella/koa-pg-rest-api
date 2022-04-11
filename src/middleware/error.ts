import log from '@modules/log';
import ApiError from '@modules/error';

import type { Context, Next } from 'koa';

const logger = log.getLogger('ErrorMiddleware');

/**
 * Wraps the entire Koa instance in an error handler
 */
export default function errorMiddleware() {
  return async function (ctx: Context, next: Next) {
    try {
      await next();
    } catch (err) {
      logger.error({ ctx, err }, 'Request failed');

      if (err instanceof ApiError) {
        ctx.status = err.statusCode;
        ctx.body = {
          error: err.message,
        };
      } else {
        ctx.status = 500;
        ctx.body = {
          error: 'An error occurred',
        };
      }

      ctx.app.emit('error', err, ctx);
    }
  };
}
