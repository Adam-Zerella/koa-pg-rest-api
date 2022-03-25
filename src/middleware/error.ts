import { Context, Next } from 'koa';
import { v4 as uuidv4 } from 'uuid';

import log from '@modules/log';
import ApiError from '@modules/error';
import { ValidationError } from 'yup';

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
    }
  };
}
