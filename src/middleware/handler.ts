import { Next } from 'koa';

import log from '@modules/log';

import type { AppContext } from '@modules/koa/types';

export interface HandlerFnResult<TData> {
  result: TData | TData[] | null;
  statusCode?: number;
}

type HandlerFn = (ctx: AppContext) => Promise<HandlerFnResult<any> | any>;

const logger = log.getLogger('HandlerMiddleware');

/**
 * Wrap a function callback for error handling
 */
export default function (handlerFn: HandlerFn) {
  return async function (ctx: AppContext, next: Next) {
    await next();

    try {
      const { statusCode = 200, ...data } = await handlerFn(ctx);

      ctx.status = statusCode;
      ctx.body = data;
    } catch (err) {
      logger.error({ ctx }, 'Handler failed to return a result');
      throw err;
    }
  };
}
