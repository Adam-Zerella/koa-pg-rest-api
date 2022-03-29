import { Context, Next } from 'koa';
import { v4 as uuidv4 } from 'uuid';

import log from '@modules/log';

const logger = log.getLogger('TraceMiddleware');

/**
 * Attaches a unique ID to each request that comes in for tracability.
 */
export default function rquidMiddleware() {
  return async function (ctx: Context, next: Next) {
    const requestId = uuidv4();

    ctx.state.rquid = requestId;
    ctx.set('X-Request-ID', requestId);

    logger.debug({ ctx }, 'Attached unique ID to request state');

    await next();
  };
}
