import { ValidationError } from 'yup';

// import log from '@modules/log';
import ApiError from '@modules/error';

import type { Next } from 'koa';
import type { AppContext } from '@modules/koa/types';
import type { AnyObjectSchema } from 'yup';

// const logger = log.getLogger('ValidateMiddleware');

export interface Schemas {
  query?: AnyObjectSchema;
  body?: AnyObjectSchema;
  param?: AnyObjectSchema;
}

/**
 * Validate and mutate the request context against 1 or more schemas.
 */
export default function validateMiddleware(schemas: Schemas) {
  return async function (ctx: AppContext, next: Next) {
    try {
      const { request, params, query } = ctx;
      const { body: bodySchema, param: paramSchema, query: querySchema } = schemas;

      if (bodySchema) {
        ctx.body = await bodySchema.validate(request.body, { stripUnknown: true });
      }
      if (paramSchema) {
        ctx.params = await paramSchema.validate(params, { stripUnknown: true });
      }
      if (querySchema) {
        /**
         * @see https://github.com/koajs/koa/blob/master/lib/request.js#L185
         * We cannot set ctx.query and preserve the valid, casted types, store it in state as a workaround.
         */
        ctx.state.query = await querySchema.validate(query, { stripUnknown: true });
      }
      await next();
    } catch (err) {
      if (err instanceof ValidationError) {
        // logger.error({ ctx, err }, 'Failed to validate schema');
        throw new ApiError(err.message, 400);
      }

      throw err;
    }
  };
}
