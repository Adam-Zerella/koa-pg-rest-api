import { knex } from 'knex';
import { attachPaginate } from 'knex-paginate';
import { omit } from 'ramda';

import env from '@modules/env';
import log from '@modules/log';

const logger = log.getLogger('QueryBuilder');

/** Attaches a `.paginate()` function to Knex' query builder */
attachPaginate();

export default knex({
  client: 'pg',
  connection: env.DB_URI,
  debug: env.NODE_ENV !== 'production',

  pool: {
    destroyTimeoutMillis: 10000,
  },

  log: {
    debug({ sql }) {
      logger.debug(sql);
    },
    warn({ sql }) {
      logger.warn(sql);
    },
    error({ sql }) {
      logger.error(sql);
    },
  },

  postProcessResponse: (result) => {
    if (Array.isArray(result)) {
      const omittedResults = result.map((row) => omit(['created_at', 'updated_at'], row));
      return omittedResults;
    }

    const omittedResult = omit(['created_at', 'updated_at'], result);
    return omittedResult;
  },
});
